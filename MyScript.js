let menuIcon = document.querySelector('#menu_icon')
let navbar = document.querySelector('.navbar')

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active')
}

window.onscroll = () => {
    menuIcon.classList.remove('bx-x')
    navbar.classList.remove('active')
}

window.onload = function () {
  getData();
  getDataAsmaul();
};
function getData() {
  fetch("https://api.banghasan.com/quran/format/json/surat")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed To Fetch Data");
      }
      return response.json();
    })
    .then(function (data) {
      displayData(data);
    })
    .catch(function (error) {
      console.log("An Error Occurred", error);
    });
}
function displayData(data) {
  var resultDiv = document.getElementById("result");
  resultDiv.className = "result_div";
  resultDiv.innerHTML = "";

  data.hasil.forEach(function (surat) {
    var suratDiv = document.createElement("div");
    suratDiv.className = "surat_div";
    suratDiv.classList.add("surah");

    // Nama Surat
    var namaSurah = document.createElement("h2");
    namaSurah.className = "nama_surat";
    namaSurah.textContent = surat.nama;

    var hr = document.createElement("hr");
    hr.className = "hr";

    // Asma Surat
    var asmaSurah = document.createElement("h2");
    asmaSurah.className = "asma_surat";
    asmaSurah.textContent = surat.asma;

    var typeSurah = document.createElement("h2");
    typeSurah.className = "type_surat";
    typeSurah.textContent = "Diturunkan di : " + surat.type;

    var artiSurah = document.createElement("h2");
    artiSurah.className = "arti_surat";
    artiSurah.textContent = "Arti : " + surat.arti;

    suratDiv.appendChild(namaSurah);
    suratDiv.appendChild(hr);
    suratDiv.appendChild(asmaSurah);
    suratDiv.appendChild(typeSurah);
    suratDiv.appendChild(artiSurah);

    resultDiv.appendChild(suratDiv);
  });
}

function getDataAsmaul() {
  fetch("https://api.aladhan.com/v1/asmaAlHusna")
    .then(function (responses) {
      if (!responses.ok) {
        throw new Error("Failed To Fetch Data");
      }
      return responses.json();
    })
    .then(function (dataAsmaul) {
      displayDataAsmaul(dataAsmaul);
    })
    .catch(function (error) {
      console.log("An Error Occured", error);
    });
}
function displayDataAsmaul(dataAsmaul) {
  var divHasil = document.getElementById("resultAsmaul");
  divHasil.className = "resultAsmaul_div";
  divHasil.innerHTML = "";

  dataAsmaul.data.forEach(function (asmaulhusna) {
    var Asmauldiv = document.createElement("div");
    Asmauldiv.className = "asmaul_div";
    Asmauldiv.classList.add("asmaul");

    // Nama Asmaul
    var namaAsmaul = document.createElement("h2");
    namaAsmaul.className = "nama_asmaul";
    namaAsmaul.textContent = asmaulhusna.name;

    // Latin Asmaul Husna
    var latinAsmaul = document.createElement("h2");
    latinAsmaul.className = "latin_asmaul";
    latinAsmaul.textContent = asmaulhusna.transliteration;

    // Meaning
    var artiAsmaul = document.createElement("h2");
    artiAsmaul.className = "arti_asmaul";
    artiAsmaul.textContent = "The Meaning is : " + asmaulhusna.en.meaning;

    Asmauldiv.appendChild(namaAsmaul);
    Asmauldiv.appendChild(latinAsmaul);
    Asmauldiv.appendChild(artiAsmaul);

    divHasil.appendChild(Asmauldiv);
  });
}

// Jadwal Sholat
const city = 1222;
const date = new Date();
const dd = String(date.getDate()).padStart(2, "0");
const mm = String(date.getMonth() + 1).padStart(2, "0");
const yyyy = date.getFullYear();
const now = yyyy + "-" + mm + "-" + dd;

const jadwalAPI = `https://api.myquran.com/v1/sholat/jadwal/${city}/${yyyy}/${mm}`;

fetch(jadwalAPI)
  .then(function (respons) {
    if (!respons.ok) {
      throw new Error("There's somthing went wrong");
    }
    return respons.json();
  })
  .then((dataJadwalSholat) => {
    const jadwal = dataJadwalSholat.data;

    const list = jadwal.jadwal;
    const listJadwal = document.getElementById("list_jadwal");
    const kota = document.getElementById("city");
    const provinsi = document.getElementById("prov");

    kota.innerHTML = jadwal.lokasi;
    provinsi.innerHTML = jadwal.daerah;

    list.forEach((el) => {
        const tr = document.createElement("tr");

        if(el.date === now) {
          tr.classList.add("table_primary")
        }

        const dd = document.createElement("td");
        dd.className = "date";
        dd.innerText = el.tanggal;

        const imsak = document.createElement("td");
        imsak.className = "imsak";
        imsak.innerText = el.imsak;

        const subuh = document.createElement("td");
        subuh.className = "subuh";
        subuh.innerText = el.subuh;

        const terbit = document.createElement("td");
        terbit.className = "terbit"
        terbit.innerText = el.terbit;

        const dhuha = document.createElement("td");
        dhuha.className = "dhuha";
        dhuha.innerText = el.dhuha;

        const dzuhur = document.createElement("td");
        dzuhur.className = "dzuhur";
        dzuhur.innerText = el.dzuhur;

        const ashar = document.createElement("td");
        ashar.className = "ashar"
        ashar.innerText = el.ashar;

        const maghrib = document.createElement("td");
        maghrib.className = "maghrib"
        maghrib.innerText = el.maghrib;

        const isya = document.createElement("td");
        isya.className 
        isya.innerText = el.isya;

        listJadwal.appendChild(tr);
        tr.appendChild(dd);
        tr.appendChild(imsak);
        tr.appendChild(subuh);
        tr.appendChild(terbit);
        tr.appendChild(dhuha);
        tr.appendChild(dzuhur);
        tr.appendChild(ashar);
        tr.appendChild(maghrib);
        tr.appendChild(isya);
    })
  })



