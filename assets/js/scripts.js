let listUsers = [];
let listUsersNew = [];

window.addEventListener("load", async () => {
  listUsersNew = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  )
    .then((users) => users.json())
    .then((users) => {
      listUsers = users.results.map((user) => {
        return {
          userName: `${user.name.first} ${user.name.last}`,
          gender: user.gender,
          age: user.dob.age,
          picture: user.picture.thumbnail,
        };
      });
      return listUsers;
    });

  inputTextSearch = document.querySelector("#idSearch");
  btnSearch = document.querySelector("#btnSearch");

  inputTextSearch.addEventListener("keyup", () => {
    if (event.key === "Enter") {
      searchUsers(event.srcElement.value.toLowerCase());
    }
  });

  btnSearch.addEventListener("click", () => {
    searchUsers(inputTextSearch.value);
  });
});

function searchUsers(text) {
  divEstatistica = document.querySelector("#divEstatistica");
  divEstatistica.innerHTML = ``;

  let resultFindUsers = listUsers.filter((user) => {
    if (user.userName.toLowerCase().indexOf(text) != -1) {
      return user;
    }
  });

  const totalUsers = resultFindUsers.length;

  if (resultFindUsers.length == 0) {
    document.querySelector("#divUsers").innerHTML = `NENHUM USUÁRIO ENCONTRADO`;

    document.querySelector("#divEstatistica").innerHTML = `NADA A SER EXIBIDO`;

    return true;
  }

  let conteudo = `<ul class="collection">`;

  conteudo += `<li class="center"><h2>${totalUsers} usuário(s) encontrado(s)</h2></li>`;

  resultFindUsers.forEach((user) => {
    conteudo += ` <li class="collection-item avatar">
                    <img src="${user.picture}" alt="" class="circle">
                    <span class="title left">${user.userName}, ${user.age} anos</span>
                  </li>`;
  });

  conteudo += "<ul>";
  document.querySelector("#divUsers").innerHTML = conteudo;

  let sumGenderMale = 0;
  let sumGenderFemale = 0;
  let sumAge = 0;

  resultFindUsers.forEach((user) => {
    if (user.gender === "male") {
      sumGenderMale++;
    } else {
      sumGenderFemale++;
    }

    sumAge = sumAge + user.age;
  });

  let mediaAge = (sumAge / resultFindUsers.length).toFixed(2);

  document.querySelector("#divEstatistica").innerHTML = `
    
  <ul class="collection">
      <li class="center">
        <h2>Estatísticas</h2>
      </li>

      <li class="collection-item">
        <div class="left left-align">
          <p class="title">
            Sexo Masculino: <span class="">${sumGenderMale}</span>
          </p>
          <p class="title">
            sexo Feminino: <span>${sumGenderFemale}</span>
          </p>
          <p class="title">
            Somatório: <span>${sumAge}</span>
          </p>
          <p class="title">
            Média: <span>${mediaAge}</span>
          </p>
        </div>
      </li>
    </ul>`;
}
