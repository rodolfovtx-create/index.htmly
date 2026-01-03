export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");

    const paymentId = body.data?.id;
    if (!paymentId) {
      return { statusCode: 200, body: "ok" };
    }

    const r = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_TOKEN}`
        }
      }
    );

    const payment = await r.json();

    if (payment.status === "approved") {
      console.log("PAGAMENTO APROVADO:", paymentId);
    }

    return { statusCode: 200, body: "ok" };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
      }
