const reportsService = require("../services/reportsService");

// Generate Statement PDF
const generateStatement = async (req, res) => {
  try {
    const data = req.body;

    const pdfBuffer =
      await reportsService.generateStatementPdf(data);

    const reportId = data.reportId || `STATEMENT-${Date.now()}`;

    reportsService.saveReport(reportId, pdfBuffer);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${reportId}.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Generate statement error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate statement PDF",
    });
  }
};

// Generate Invoice PDF
const generateInvoice = async (req, res) => {
  try {
    const data = req.body;

    const pdfBuffer =
      await reportsService.generateInvoicePdf(data);

    const reportId = data.invoiceId || `INVOICE-${Date.now()}`;

    reportsService.saveReport(reportId, pdfBuffer);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${reportId}.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Generate invoice error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate invoice PDF",
    });
  }
};

// Download Generated Report
const downloadReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    const pdfBuffer = reportsService.getReport(reportId);

    if (!pdfBuffer) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${reportId}.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Download report error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to download report",
    });
  }
};

// Export Settlements PDF
const exportSettlements = async (req, res) => {
  try {
    const data = req.body;

    const pdfBuffer =
      await reportsService.generateSettlementExportPdf(data);

    const reportId =
      data.reportId || `SETTLEMENT-${Date.now()}`;

    reportsService.saveReport(reportId, pdfBuffer);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${reportId}.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Export settlements error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to export settlements PDF",
    });
  }
};

module.exports = {
  generateStatement,
  generateInvoice,
  downloadReport,
  exportSettlements,
};