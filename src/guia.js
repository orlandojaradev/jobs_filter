const d = document;

const $fragmento = d.createDocumentFragment(),
  $empleo = d.querySelector(".empleo"),
  $checkbox = d.querySelectorAll("input"),
  $contenedorChk = d.querySelector(".checkbox");

async function getJobs() {
  try {
    let res = await fetch("./data.json"),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    json.forEach((el) => {
      let $p = d.createElement("p");
      $p.textContent = el.company;
      $fragmento.appendChild($p);
    });

    $empleo.appendChild($fragmento);

    $contenedorChk.addEventListener("click", (e) => {
      let chk = [];
      $checkbox.forEach((el, i) => {
        if (el.checked) {
          chk.push(el.value);
        } else {
          chk.splice(i, 1);
        }
      });

      $empleo.textContent = "";
      if (chk.length > 0) {
        json.filter((el) => {
          const $p = d.createElement("p");
          if (chk.includes(el.role)) {
            $p.textContent = el.company;
          }
          return $fragmento.appendChild($p);
        });

        $empleo.appendChild($fragmento);
      } else {
        json.forEach((el) => {
          let $p = d.createElement("p");
          $p.textContent = el.company;
          $fragmento.appendChild($p);
        });

        $empleo.appendChild($fragmento);
      }
    });
  } catch (err) {
    let message = err.statusText || "Ocurrio un error";
    $empleo.innerHTML = `Error ${err.status}: ${message}`;
  } finally {
  }
}

getJobs();
