import { useState } from "react";
import jsPDF from "jspdf";

const Index = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [basic, setBasic] = useState("");
  const [allowance, setAllowance] = useState("");
  const [deductions, setDeductions] = useState("");

  const basicNum = parseFloat(basic) || 0;
  const allowanceNum = parseFloat(allowance) || 0;
  const deductionsNum = parseFloat(deductions) || 0;
  const netPay = basicNum + allowanceNum - deductionsNum;

  const generatePDF = () => {
    const doc = new jsPDF();
    const now = new Date().toLocaleDateString();

    doc.setFontSize(20);
    doc.text("PAYSLIP", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.text(`Date: ${now}`, 160, 30);

    doc.setDrawColor(200);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(12);
    let y = 50;
    const row = (label: string, value: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 30, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, 110, y);
      y += 12;
    };

    row("Employee Name:", name || "—");
    row("Employee ID:", id || "—");

    y += 5;
    doc.line(20, y, 190, y);
    y += 15;

    row("Basic Salary:", `$${basicNum.toFixed(2)}`);
    row("Allowance:", `$${allowanceNum.toFixed(2)}`);
    row("Deductions:", `$${deductionsNum.toFixed(2)}`);

    y += 5;
    doc.line(20, y, 190, y);
    y += 15;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Net Pay:", 30, y);
    doc.text(`$${netPay.toFixed(2)}`, 110, y);

    doc.save(`payslip-${id || "employee"}.pdf`);
  };

  const inputClass =
    "w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <div className="min-h-screen bg-background flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-foreground mb-8">Payslip Generator</h1>

        <div className="space-y-4">
          <div>
            <label className={labelClass}>Employee Name</label>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
          </div>

          <div>
            <label className={labelClass}>Employee ID</label>
            <input className={inputClass} value={id} onChange={(e) => setId(e.target.value)} placeholder="EMP-001" />
          </div>

          <div>
            <label className={labelClass}>Basic Salary ($)</label>
            <input className={inputClass} type="number" value={basic} onChange={(e) => setBasic(e.target.value)} placeholder="0.00" />
          </div>

          <div>
            <label className={labelClass}>Allowance ($)</label>
            <input className={inputClass} type="number" value={allowance} onChange={(e) => setAllowance(e.target.value)} placeholder="0.00" />
          </div>

          <div>
            <label className={labelClass}>Deductions ($)</label>
            <input className={inputClass} type="number" value={deductions} onChange={(e) => setDeductions(e.target.value)} placeholder="0.00" />
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex justify-between items-center text-lg font-semibold text-foreground">
              <span>Net Pay:</span>
              <span>${netPay.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={generatePDF}
            className="w-full rounded bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Generate PDF Payslip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
