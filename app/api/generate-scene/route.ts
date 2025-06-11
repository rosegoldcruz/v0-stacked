import Replicate from "replicate"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    // Validate prompt
    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Prompt is required and must be a string." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log(`Generating scene with prompt: "${prompt}"`)

    // Call Replicate API
    const output = await replicate.run("minimax/video-01", {
      input: { prompt },
    })

    // Replicate's minimax/video-01 model typically returns a URL string for the video.
    // Ensure the output is a string (URL) before returning.
    if (typeof output !== "string") {
      console.error("Replicate API did not return a valid video URL:", output)
      return new Response(JSON.stringify({ error: "Failed to get a valid video URL from Replicate." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ videoUrl: output }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error in /api/generate-scene:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error during video generation." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
