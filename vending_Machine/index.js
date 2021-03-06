const coList = document.querySelector(".Cola_list");

const btn_item = document.querySelectorAll(".Cola_list .btn_item");

const item_staged_before = document.querySelector(".list .list_item_staged");

// 콜라 버튼 이벤트 처리 함수
function clickHandler(e) {
  const elLi = document.createElement("li");
  let elem = e.target;
  while (!elem.classList.contains("btn_item")) {
    elem = elem.parentNode;
    if (elem.nodeName == "BODY") {
      elem = null;
      return;
    }
  }

  console.log(e.target); //coList중 내가 클릭한 애 출력 , currentTarget은 ul이 찍힘
  const src = elem.children[0].getAttribute("src"); //이미지
  const name = elem.children[1].textContent; // 콜라명
  const btn = document.querySelectorAll(".list .list_item_staged button"); // 구매목록에 있는 콜라 목록

  // 획득 목록에 아무 콜라도 없을 경우
  if (btn.length == 0) {
    console.log("아무것도 없음");
    elLi.innerHTML = `
    <button type="button" class="btn_staged purchase">
    <img class="mini" src=${src} alt="" />
    <strong class="txt_item">${name}</strong>
    <span class="item_num">1</span>
  </button>
        `;
    item_staged_before.appendChild(elLi);
  }

  // 획득 목록에 콜라가 있을 경우
  for (i = 0; i < btn.length; i++) {
    //같은 콜라를 선택했다면 수량만 증가

    if (btn[i].children[1].textContent == name) {
      btn[i].children[2].textContent =
        Number(btn[i].children[2].textContent) + 1;
      break;
    }

    //마지막까지 돌았는데도 없으면 새로운 콜라 목록 추가
    else if (i == btn.length - 1) {
      //  box에 클릭한 콜라 li추가
      console.log("src,name");
      console.log(src);
      console.log(name);

      // innerHTMl 으로 만든거

      //   elLi.innerHTML = `
      //   <button type="button" class="btn_staged purchase">
      //   <img class="mini" src=${src} alt="" />
      //   <strong class="txt_item">${name}</strong>
      //   <span class="item_num">1</span>
      // </button>
      //       `;
      //  박스를 부모로 연결하기
      // item_staged_before.appendChild(elLi);

      //=-------------------------------------------------------------

      //li만들기
      const elLi = document.createElement("li");

      //button만들기
      const colaBtn = document.createElement("button");
      colaBtn.classList.add("btn_staged");

      //button하위요소 3개
      //이미지
      const colaImg = document.createElement("img");
      colaImg.classList.add("mini");
      colaImg.setAttribute("src", src);

      //콜라명
      const strongTxt = document.createElement("strong");
      // 콜라명 가져오기
      strongTxt.classList.add("txt_item");
      strongTxt.textContent = name;

      //콜라갯수
      const spanNum = document.createElement("span");
      spanNum.textContent = "1";
      spanNum.classList.add("item_num");
      //버튼하위요소 3개
      colaBtn.appendChild(colaImg);
      colaBtn.appendChild(strongTxt);
      colaBtn.appendChild(spanNum);

      //li하위에 버튼추가
      elLi.appendChild(colaBtn);

      item_staged_before.appendChild(elLi);
    }
  }
}

coList.addEventListener("click", clickHandler);

// ------------------------------------------

// 획득 btn 이벤트 처리
const getBtn = document.querySelector(".btn_get");

//ul
const item_staged_after = document.querySelector(
  ".my_order_list .list_item_staged"
);

const elLiAfter = document.querySelectorAll(".list .list_item_staged li");

const totalPrice = document.querySelector(".total_price");

getBtn.addEventListener("click", (e) => {
  item_staged_after.innerHTML = null;
  let totalColaNum = 0; // 총 콜라갯수 (금액계산을 위한)

  for (i = 0; i < item_staged_before.children.length; i++) {
    console.log(item_staged_before.children[i]);

    // li만들기
    const elLi = document.createElement("li");

    //button만들기
    const btn = document.createElement("button");
    btn.classList.add("btn_staged");

    //button하위요소 3개

    //이미지
    const img = document.createElement("img");
    img.classList.add("mini");
    //이미지 url가져오기
    const imgURL =
      item_staged_before.children[i].children[0].children[0].getAttribute(
        "src"
      );
    img.setAttribute("src", imgURL);

    //콜라명
    const strongTxt = document.createElement("strong");
    // 콜라명 가져오기
    const colaName =
      item_staged_before.children[i].children[0].children[1].textContent;

    strongTxt.classList.add("txt_item");
    strongTxt.textContent = colaName;
    //콜라갯수
    const spanNum = document.createElement("span");
    const colaNum =
      item_staged_before.children[i].children[0].children[2].textContent;
    spanNum.classList.add("item_num");
    spanNum.textContent = colaNum;

    totalColaNum += Number(colaNum);

    //버튼하위요소 3개
    btn.appendChild(img);
    btn.appendChild(strongTxt);
    btn.appendChild(spanNum);

    //li하위에 버튼추가
    elLi.appendChild(btn);

    //li를 ul에 추가
    item_staged_after.appendChild(elLi);
  }

  totalPrice.textContent =
    "총금액 : " + (totalColaNum * 1000).toLocaleString("ko-KR") + "원";
});

// 입금액 입력시 소지금에 뿌리기
// ------------------------------------------

const inputDepo = document.querySelector(".deposit");
const DepoBtn = document.querySelector(".deposit_btn");
const priceNow = document.querySelector(".possession_price_now");

DepoBtn.addEventListener("click", (e) => {
  let price = inputDepo.value;
  let price_now = parseInt(priceNow.textContent.replace(",", ""));
  if (price <= 0) {
    alert("금액이 0원 이하입니다. 다시 입력해주세요");
  }
  inputDepo.value = ""; // 임금액 입력후 초기화

  console.log(Number(price));
  console.log(price_now);
  priceNow.textContent =
    (Number(price) + price_now).toLocaleString("ko-KR") + "원";
});

// 숫자 길이 제한함수
function maxLengthCheck(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}

// ------------------------------------------

let regex = /[^0-9]/g;
//거스름돈 반환 함수
const returnBtn = document.querySelector(".return_btn");
const balance = document.querySelector(".txt_balance");

returnBtn.addEventListener("click", (e) => {
  const deposit = priceNow.textContent;
  const total = totalPrice.textContent.replace(regex, "");
  const depoPrice = parseInt(deposit.replace(",", ""));

  if (depoPrice === "0원") {
    alert("먼저 돈을 입금하세요!");
  } else if (depoPrice < total) {
    alert("돈이 부족합니다");
  }
  //획득버튼을 누르지 않아 총 금액을 모를경우
  else if (total === "") {
    alert("먼저 획득버튼을 눌러주세요!");
  } else {
    let balCalc = depoPrice - total;
    balance.textContent = balCalc.toLocaleString("ko-KR") + "원";
    alert("맛있게 드세요^^");
  }
});
