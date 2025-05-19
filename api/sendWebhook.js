// api/sendWebhook.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const webhookURL = process.env.DISCORD_WEBHOOK_URL;

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) throw new Error("Erro ao enviar para o Discord");

    return res.status(200).json({ message: "Enviado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao enviar" });
  }
}
