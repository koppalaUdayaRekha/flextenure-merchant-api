const puppeteer = require("puppeteer");

const generatePdf = async (htmlContent) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
};

const generateStatementPdf = async (data) => {
  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 30px;
          }

          h1 {
            text-align: center;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }

          th {
            background: #f2f2f2;
          }
        </style>
      </head>

      <body>
        <h1>Account Statement</h1>

        <p><strong>Merchant ID:</strong> ${data.merchantId || ""}</p>
        <p><strong>From:</strong> ${data.fromDate || ""}</p>
        <p><strong>To:</strong> ${data.toDate || ""}</p>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            ${(data.transactions || [])
              .map(
                (transaction) => `
                  <tr>
                    <td>${transaction.date || ""}</td>
                    <td>${transaction.transactionId || ""}</td>
                    <td>${transaction.amount || ""}</td>
                    <td>${transaction.status || ""}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;

  return generatePdf(html);
};

const generateInvoicePdf = async (data) => {
  const browser = await puppeteer.launch({
    headless: true
  });

  try {
    const page = await browser.newPage();

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 30px;
          }

          h1 {
            text-align: center;
          }

          .details {
            margin-top: 30px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
          }

          th, td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }

          th {
            background: #f2f2f2;
          }

          .total {
            text-align: right;
            margin-top: 25px;
            font-size: 18px;
            font-weight: bold;
          }
        </style>
      </head>

      <body>
        <h1>Invoice</h1>

        <div class="details">
          <p><strong>Merchant ID:</strong> ${data.merchantId || ""}</p>
          <p><strong>Invoice ID:</strong> ${data.invoiceId || ""}</p>
          <p><strong>Transaction ID:</strong> ${data.transactionId || ""}</p>
          <p><strong>Customer Name:</strong> ${data.customerName || ""}</p>
          <p><strong>Date:</strong> ${data.date || ""}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>${data.description || "Transaction"}</td>
              <td>${data.amount || 0} ${data.currency || "INR"}</td>
              <td>${data.status || "PAID"}</td>
            </tr>
          </tbody>
        </table>

        <div class="total">
          Total: ${data.amount || 0} ${data.currency || "INR"}
        </div>

      </body>
      </html>
    `;

    await page.setContent(html, {
      waitUntil: "networkidle0"
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true
    });

    return pdfBuffer;

  } finally {
    await browser.close();
  }
};
const generateSettlementExportPdf = async (data) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 30px;
        }

        h1 {
          text-align: center;
        }

        .details {
          margin-top: 25px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 25px;
        }

        th, td {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: left;
        }

        th {
          background: #f2f2f2;
        }
      </style>
    </head>

    <body>

      <h1>Settlement History</h1>

      <div class="details">
        <p>
          <strong>Merchant ID:</strong>
          ${data.merchantId || ""}
        </p>

        <p>
          <strong>From:</strong>
          ${data.fromDate || ""}
        </p>

        <p>
          <strong>To:</strong>
          ${data.toDate || ""}
        </p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Settlement ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          ${(data.settlements || [])
            .map(
              (settlement) => `
                <tr>
                  <td>${settlement.date || ""}</td>
                  <td>${settlement.settlementId || ""}</td>
                  <td>
                    ${settlement.amount || 0}
                    ${settlement.currency || "INR"}
                  </td>
                  <td>${settlement.status || ""}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>

    </body>
    </html>
  `;

  return generatePdf(html);
};
const reportStore = new Map();

const saveReport = (reportId, pdfBuffer) => {
  reportStore.set(reportId, pdfBuffer);
};

const getReport = (reportId) => {
  return reportStore.get(reportId);
};
module.exports = {
  generatePdf,
  generateStatementPdf,
  generateInvoicePdf,
  generateSettlementExportPdf,
  saveReport,
  getReport,

};