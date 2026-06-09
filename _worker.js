const PLACE_ID = "ChIJa8tLe4Md1akRE1bdhNsvO_g";

const ALLOWED_ORIGINS = [
  "https://pragmaticplanning.co.nz",
  "https://pragmaticplanning.slrclaude.workers.dev"
];

function getAllowedOrigin(request) {
  const origin = request.headers.get("Origin") || "";
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
}

function corsHeaders(request, methods = "GET") {
  return {
    "Access-Control-Allow-Origin": getAllowedOrigin(request),
    "Access-Control-Allow-Methods": methods,
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

function sanitise(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[<>"'`]/g, "").trim().slice(0, 2000);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // --- Google Reviews ---
    if (url.pathname === "/api/reviews") {
      const headers = corsHeaders(request, "GET");

      if (request.method === "OPTIONS") {
        return new Response(null, { headers });
      }

      try {
        const apiUrl = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=reviews,rating,userRatingCount&key=${env.GOOGLE_API_KEY}`;
        const response = await fetch(apiUrl, {
          headers: { "X-Goog-FieldMask": "reviews,rating,userRatingCount" }
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), { headers });
      } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), {
          status: 500,
          headers,
        });
      }
    }

    // --- Contact Form ---
    if (url.pathname === "/api/contact") {
      const headers = corsHeaders(request, "POST");

      if (request.method === "OPTIONS") {
        return new Response(null, { headers });
      }

      if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers });
      }

      // Honeypot - bots fill this, humans don't
      if (body.website) {
        return new Response(JSON.stringify({ ok: true }), { headers });
      }

      const name = sanitise(body.name || "");
      const email = sanitise(body.email || "");
      const phone = sanitise(body.phone || "");
      const address = sanitise(body.address || "");
      const message = sanitise(body.message || "");

      if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: "Name, email, and message are required." }), { status: 400, headers });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(JSON.stringify({ error: "Invalid email address." }), { status: 400, headers });
      }

      const emailBody = `
New enquiry from pragmaticplanning.co.nz

Name:             ${name}
Email:            ${email}
Phone:            ${phone || "Not provided"}
Property Address: ${address || "Not provided"}

Message:
${message}

---
Sent via pragmaticplanning.co.nz contact form
`.trim();

      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Pragmatic Planning <noreply@pragmaticplanning.co.nz>",
            to: ["richard@pragmaticplanning.co.nz"],
            reply_to: email,
            subject: `New Enquiry from ${name}`,
            text: emailBody,
          }),
        });

        if (!resendRes.ok) {
          const err = await resendRes.text();
          console.error("Resend error:", err);
          return new Response(JSON.stringify({ error: "Failed to send. Please email us directly." }), { status: 500, headers });
        }

        return new Response(JSON.stringify({ ok: true }), { headers });
      } catch (error) {
        console.error("Contact error:", error);
        return new Response(JSON.stringify({ error: "Failed to send. Please email us directly." }), { status: 500, headers });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
