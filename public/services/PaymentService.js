const axios = require("axios");

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {
      },
      test: {
        access_token:"TEST-862169232309641-022015-e40248bacff6c71c09c7d561520407cc-109226416"
      }
    };
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
  }

  async createPaymentMercadoPago(name, price, unit, img) {
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;


    // TODO: urlHeroku
    img= 'https://localhost:3000/assets'+img.substring(1);



    const items = [
      {
        id: 1234,
        title: name,
        description: "Dispositivo móvil de Tienda e-commerce",
        picture_url: img,
        quantity: parseInt(unit),
        unit_price: parseFloat(price)
      }
    ];

    const preferences = {
      items,
      external_reference: "sofisnupi@hotmail.com",
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_63274575@testuser.com",
        phone: {
          area_code: "11",
          number: "22223333"
        },
        address: {
          zip_code: "1427",
          street_name: "Falsa",
          street_number: "123"
        }
      },
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex"
          }
        ],
        excluded_payment_types: [{ id: "atm" }],
        installments: 6,
        // default_installments: 6
      },
      back_urls: {
        success: "localhost:3000/success",
        pending: "localhost:3000/pending",
        failure: "localhost:3000/error"
      },
      notification_url: "localhost:3000/webhook",
      auto_return: "approved"
    };

    try {
      const request = await axios.post(url, preferences, {
        headers: {
          "Content-Type": "application/json",
          "x-integrator-id": "dev_24c65fb163bf11ea96500242ac130004"
        }
      });
      return request.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = PaymentService;