export async function handler() {
  const response = await fetch(
    "https://api.mercadopago.com/v1/payments",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MP_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        transaction_amount: 4.50,
        description: "Adicionar saldo",
        payment_method_id: "pix",
        payer: {
          email: "cliente@teste.com"
        }
      })
    }
  );

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      qr: data.point_of_interaction.transaction_data.qr_code_base64,
      copia: data.point_of_interaction.transaction_data.qr_code
    })
  };
      }
