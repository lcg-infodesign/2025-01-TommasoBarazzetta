window.addEventListener("DOMContentLoaded", () => {
  let s = function(p) {
    let table;
    let filteredRows = [];
    let col0Vals = [];
    let col1Vals = [];
    let col2Vals = [];
    let col3Vals = [];
    let col4Vals = [];

    p.preload = function() {
      table = p.loadTable("dataset.copia.csv", "csv", "header");
    };

    p.setup = function() {
      let canvas = p.createCanvas(800, 600);
      canvas.parent("graficoCanvas"); // aggancia al div del nuovo index

      p.background(255);
      p.textFont("monospace");
      p.textSize(14);
      p.fill(0);

      // Filtra le righe e raccogli i valori delle colonne
      for (let i = 0; i < table.getRowCount(); i++) {
        let col0 = table.getNum(i, 0);
        let col1 = table.getNum(i, 1);
        let col2 = table.getNum(i, 2);
        let col3 = table.getNum(i, 3);
        let col4 = table.getNum(i, 4);

        if (col0 % 5 === 0 && col3 >= 30 && col3 < 42) {
          filteredRows.push(table.getRow(i));
          col0Vals.push(col0);
          col1Vals.push(col1);
          col2Vals.push(col2);
          col3Vals.push(col3);
          col4Vals.push(col4);
        }
      }

      // Calcola statistiche
      let meanCol0 = mean(col0Vals);
      let stdCol1 = stdDeviation(col1Vals);
      let modeCol2 = mode(col2Vals);
      let medianCol3 = median(col3Vals);
      let meanCol4 = mean(col4Vals);
      let stdCol4 = stdDeviation(col4Vals);

      // Disegna la tabella filtrata
      let headers = table.columns;
      let y = 30;
      let xStart = 20;
      let colSpacing = 90;

      p.textStyle(p.BOLD);
      for (let c = 0; c < headers.length; c++) {
        p.text(headers[c], xStart + c * colSpacing, y);
      }

      p.textStyle(p.NORMAL);
      p.line(xStart, y + 5, xStart + headers.length * colSpacing, y + 5);
      y += 30;

      for (let r = 0; r < filteredRows.length; r++) {
        let row = filteredRows[r];
        for (let c = 0; c < table.columns.length; c++) {
          p.text(row.getString(c), xStart + c * colSpacing, y + r * 25);
        }
      }

      // Disegna le statistiche
      let statsY = y + filteredRows.length * 25 + 30;
      p.fill(20, 80, 150);
      p.textSize(16);
      p.textStyle(p.BOLD);
      p.text("Statistiche sulle colonne (righe filtrate):", xStart, statsY);

      statsY += 30;
      p.textStyle(p.NORMAL);
      p.fill(0);
      p.text(`Media (colonna 0): ${meanCol0.toFixed(2)}`, xStart, statsY);
      statsY += 25;
      p.text(`Deviazione standard (colonna 1): ${stdCol1.toFixed(2)}`, xStart, statsY);
      statsY += 25;
      p.text(`Moda (colonna 2): ${modeCol2.join(", ")}`, xStart, statsY);
      statsY += 25;
      p.text(`Mediana (colonna 3): ${medianCol3}`, xStart, statsY);
      statsY += 25;
      p.text(`Media (colonna 4): ${meanCol4.toFixed(2)}`, xStart, statsY);
      statsY += 25;
      p.text(`Deviazione standard (colonna 4): ${stdCol4.toFixed(2)}`, xStart, statsY);
    };

    // Funzioni statistiche
    function mean(values) {
      if (values.length === 0) return 0;
      let sum = 0;
      for (let v of values) sum += v;
      return sum / values.length;
    }

    function median(values) {
      if (values.length === 0) return 0;
      let sorted = [...values].sort((a, b) => a - b);
      let mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
    }

    function mode(values) {
      if (values.length === 0) return [];
      let counts = {};
      for (let v of values) counts[v] = (counts[v] || 0) + 1;
      let maxCount = Math.max(...Object.values(counts));
      return Object.keys(counts)
        .filter(k => counts[k] === maxCount)
        .map(Number);
    }

    function stdDeviation(values) {
      if (values.length === 0) return 0;
      let m = mean(values);
      let variance = 0;
      for (let v of values) variance += (v - m) ** 2;
      variance /= values.length;
      return Math.sqrt(variance);
    }
  };

  new p5(s); // crea lo sketch
});
