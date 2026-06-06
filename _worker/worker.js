const PLACE_ID = "ChIJa8tLe4Md1akRE1bdhNsvO_g";

export default {
  async fetch(request, env) {

    const origin = request.headers.get("Origin") || "";
    const allowedOrigins = [
      "https://pragmaticplanning.co.nz",
      "https://pragmaticplanning.slrclaude.workers.dev"
    ];
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/json",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=reviews,rating,userRatingCount&key=${env.GOOGLE_API_KEY}`;

      const response = await fetch(url, {
        headers: { "X-Goog-FieldMask": "reviews,rating,userRatingCount" }
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), { headers: corsHeaders });

    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  }
};
