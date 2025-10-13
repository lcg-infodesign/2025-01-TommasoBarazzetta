let table;
let filteredRows = [];
let col0Vals = [];
let col1Vals = [];
let col2Vals = [];
let col3Vals = [];
let col4Vals = [];
let m;

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 600);
  background(255);
  textFont("monospace");
  textSize(14);
  fill(0);

  // Filtra le righe e raccogli i valori delle colonne
  for (let i = 0; i < table.getRowCount(); i++) {
    let col0 = table.getNum(i, 0);
    let col1 = table.getNum(i, 1);
    let col2 = table.getNum(i, 2);
    let col3 = table.getNum(i, 3);
    let col4 = table.getNum(i, 4);

    if (col0 % 5 === 0 && col3 >= 30 && col3 < 42) {
      filteredRows.push(table.getRow(i));
      
      // Raccogli i valori numerici di ogni colonna che ti serve
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

  textStyle(BOLD);
  for (let c = 0; c < headers.length; c++) {
    text(headers[c], xStart + c * colSpacing, y);
  }

  textStyle(NORMAL);
  line(xStart, y + 5, xStart + headers.length * colSpacing, y + 5);
  y += 30;

  for (let r = 0; r < filteredRows.length; r++) {
    let row = filteredRows[r];
    for (let c = 0; c < table.columns.length; c++) {
      text(row.getString(c), xStart + c * colSpacing, y + r * 25);
    }
  }
   fill(20, 80, 150);
   textSize(16);
   textStyle(BOLD);
   text("Statistiche sulle colonne (righe filtrate):", xStart, y+250);
   y += 280;
   textStyle(NORMAL);
   fill(0);
   text(`Media (colonna 0): ${meanCol0.toFixed(2)}`, xStart, y);
   y += 25;
   text(`Deviazione standard (colonna 1): ${stdCol1.toFixed(2)}`, xStart, y);
   y += 25;
   text(`Moda (colonna 2): ${modeCol2.join(", ")}`, xStart, y);
   y += 25;
   text(`Mediana (colonna 3): ${medianCol3}`, xStart, y);
   y += 25;
   text(`Media (colonna 4): ${meanCol4.toFixed(2)}`, xStart, y);
   y += 25;
   text(`Deviazione standard (colonna 4): ${stdCol4.toFixed(2)}`, xStart, y);

}
// Funzioni da calcolare

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
  let modes = Object.keys(counts)
    .filter(k => counts[k] === maxCount)
    .map(Number);

  return modes;
}

function stdDeviation(values) {
  if (values.length === 0) return 0;
  let m = mean(values);
  let variance = 0;
  for (let v of values) variance += (v - m) ** 2;
  variance /= values.length;
  return Math.sqrt(variance);
}