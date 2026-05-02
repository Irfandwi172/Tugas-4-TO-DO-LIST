let tasks = JSON.parse(localStorage.getItem("todo-task")) || [];

let selectedPriority = "low";

const namaHari = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];
const namaBulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

let sekarang = new Date();
document.getElementById("hari").textContent = namaHari[sekarang.getDay()];
document.getElementById("tanggal").textContent =
  sekarang.getDate() +
  " " +
  namaBulan[sekarang.getMonth()] +
  " " +
  sekarang.getFullYear();

tampil();

function simpan() {
  localStorage.setItem("todo-task", JSON.stringify(tasks));
}

function setPriority(p) {
  selectedPriority = p;
  document.getElementById("btn-low").className = "priority-btn";
  document.getElementById("btn-medium").className = "priority-btn";
  document.getElementById("btn-high").className = "priority-btn";
  document.getElementById("btn-" + p).className = "priority-btn active-" + p;
}

function addTask() {
  const teks = document.getElementById("task-input").value.trim();

  if (teks === "") {
    alert("Tulis tugas terlebih dahulu!");
    return;
  }

  tasks.push({
    id: Date.now(),
    teks: teks,
    prioritas: selectedPriority,
    tanggal:
      sekarang.getDate() +
      " " +
      namaBulan[sekarang.getMonth()] +
      " " +
      sekarang.getFullYear(),
    selesai: false,
  });

  simpan();
  document.getElementById("task-input").value = "";
  tampil();
}

function checkSelesai(id) {
  for (let c = 0; c < tasks.length; c++) {
    if (tasks[c].id === id) {
      tasks[c].selesai = !tasks[c].selesai;
      break;
    }
  }
  simpan();
  tampil();
}

function deleteTask(id) {
  tasks = tasks.filter(function (t) {
    return t.id !== id;
  });
  simpan();
  tampil();
}

function deleteAll() {
  if (tasks.length === 0) return;
  if (confirm("Yakin ingin menghapus semua tugas?")) {
    tasks = [];
    simpan();
    tampil();
  }
}

function tampil() {
  const belumSelesai = tasks.filter(function (t) {
    return !t.selesai;
  });
  const sudahSelesai = tasks.filter(function (t) {
    return t.selesai;
  });

  let htmlTodo = "";
  if (belumSelesai.length === 0) {
    htmlTodo = '<p class="empty-msg">Belum ada tugas.</p>';
  } else {
    for (let i = 0; i < belumSelesai.length; i++) {
      let t = belumSelesai[i];
      htmlTodo +=
        '<div class="todo-item">' +
        '<input type="checkbox" onchange="checkSelesai(' +
        t.id +
        ')">' +
        '<div class="todo-content">' +
        '<span class="todo-text">' +
        t.teks +
        "</span>" +
        '<span class="badge badge-' +
        t.prioritas +
        '">' +
        t.prioritas +
        "</span>" +
        '<div class="todo-meta">' +
        t.tanggal +
        "</div>" +
        "</div>" +
        '<button class="btn-delete-item" onclick="deleteTask(' +
        t.id +
        ')">×</button>' +
        "</div>";
    }
  }
  document.getElementById("todo-list").innerHTML = htmlTodo;

  let htmlDone = "";
  if (sudahSelesai.length === 0) {
    htmlDone = '<p class="empty-msg">Belum ada tugas selesai.</p>';
  } else {
    for (let j = 0; j < sudahSelesai.length; j++) {
      let d = sudahSelesai[j];
      htmlDone +=
        '<div class="done-item">' +
        '<span class="done-icon">✓</span>' +
        "<span>" +
        d.teks +
        "</span>" +
        '<span class="badge badge-' +
        d.prioritas +
        '">' +
        d.prioritas +
        "</span>" +
        "</div>";
    }
  }
  document.getElementById("done-list").innerHTML = htmlDone;
}
