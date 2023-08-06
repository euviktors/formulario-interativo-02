// Selecionar os elementos do DOM
const adicionarFotoBtn = document.querySelector(".adicionar-foto");
const exportarBtn = document.querySelector(".exportar");
const fotoContainer = document.querySelector(".foto-container");

let numFotos = 2; // Começando a partir de 2, pois já existe a Foto 1

// Função para exibir a foto carregada
function exibirFoto(input, preview) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      preview.src = reader.result;
      preview.style.display = "block";
    });

    reader.readAsDataURL(file);
  }
}

// Adicionar evento para o botão "Adicionar Mais Fotos"
adicionarFotoBtn.addEventListener("click", function () {
  const novoFotoInput = document.createElement("div");
  novoFotoInput.classList.add("foto-input");
  novoFotoInput.innerHTML = `
    <label>
      Anexar Foto ${numFotos}:<br />
      <input type="file" class="foto-input-field" accept="image/*" />
      Título da Foto ${numFotos}: <input type="text" class="titulo-foto-input" />
      <button class="enviar-foto">Enviar Foto</button>
    </label>
    <div class="foto-preview">
      <img class="foto-preview-img" src="#" alt="Foto ${numFotos}" />
    </div>
  `;
  fotoContainer.appendChild(novoFotoInput);
  numFotos++;

  const novoEnviarFotoBtn = novoFotoInput.querySelector(".enviar-foto");
  const novoFotoInputField = novoFotoInput.querySelector(".foto-input-field");
  const novoFotoPreview = novoFotoInput.querySelector(".foto-preview-img");

  novoEnviarFotoBtn.addEventListener("click", function () {
    exibirFoto(novoFotoInputField, novoFotoPreview);
  });
});

// Adicionar evento para o botão "Enviar Foto"
novoEnviarFotoBtn.addEventListener("click", function () {
  exibirFoto(novoFotoInputField, novoFotoPreview);
});

// Adicionar evento para o botão "Exportar"
exportarBtn.addEventListener("click", function () {
  const opt = {
    margin: 10,
    filename: "proposta.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  const targetElement = document.querySelector(".formulario"); // Elemento que será exportado
  html2pdf().from(targetElement).set(opt).outputPdf();
});
