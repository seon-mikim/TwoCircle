import { product } from "../../api/products/admin/product_update.js";

const id = location.href.split('?')[1];

const nameEl = document.querySelector('.product_name');
const priceEl = document.querySelector('.product_price');
const textEl = document.querySelector('.product_text');
const tagEl = document.querySelector('.product_tag');
const thumbnailEl = document.querySelector('.product_img');
const thumbnailUpdate = document.querySelector('.product_update_img');
const photoEl = document.querySelector('.product_detail_img');
const photoUpdate = document.querySelector('.detail_update_img');
const soldoutEl = document.querySelector('.soldout');
const discountEl = document.querySelector('.product_discount');
const product_update = document.querySelector('.product_update');

let name = '';
let price = '';
let text = '';
let tag = '';
let thumbnailImgBase64 = '';
let photoImgBase64 = '';
let soldout = '';
let discount = '';

(async () => {
  const data = await product(id);
  renderProduct(data);
})();

function renderProduct(data) {
  console.log(data);

  name = nameEl.value = data.title;
  price = priceEl.value = data.price;
  text = textEl.value = data.description;
  if (Array.isArray(data.tags)) {
    tag = tagEl.value = data.tags.join(', ');
  } else {
    tag = tagEl.value = data.tags;
  }

  if (data.thumbnail !== null) {
    thumbnailEl.innerHTML = /* html */ `
      <img src=${data.thumbnail} alt="" />
    `;
  } else {
    thumbnailEl.innerHTML = /* html */ `
      <img src="https://via.placeholder.com/200x200?text=NO+IMAGE" alt="" />
    `;
  }

  if (data.photo !== null) {
    photoEl.innerHTML = /* html */ `
      <img src=${data.photo} alt="" />
    `;
  } else {
    photoEl.innerHTML = /* html */ `
      <img src="https://via.placeholder.com/200x250?text=NO+IMAGE" alt="" />
    `;
  }

  soldout = data.isSoldOut;
  if (soldout) {
    soldoutEl.innerText = '매진';
  } else {
    soldoutEl.innerText = '판매중';
  }

  discount = discountEl.value = data.discountRate;
}


nameEl.addEventListener('input', e => {
  name = e.target.value;
});
priceEl.addEventListener('input', e => {
  price = Number(e.target.value);
  if (isNaN(price)) {
    e.target.value = '';
  }
});
textEl.addEventListener('input', e => {
  text = e.target.value;
});
tagEl.addEventListener('input', e => {
  tag = e.target.value.split(', ');
});
thumbnailUpdate.addEventListener('change', event => {
  const file = thumbnailUpdate.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener('load', e => {
    // console.log(e.target.result); // base64
    thumbnailImgBase64 = e.target.result;
    const img = document.querySelector('.product_img img');
    img.src = thumbnailImgBase64;
  });
});

photoUpdate.addEventListener('change', event => {
  const file = photoUpdate.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener('load', e => {
    photoImgBase64 = e.target.result;
    const img = document.querySelector('.product_detail_img img');
    img.src = photoImgBase64;
  });
});

soldoutEl.addEventListener('click', e => {
  if (soldout) {
    soldout = false;
    soldoutEl.innerText = '판매중';
  } else {
    soldout = true;
    soldoutEl.innerText = '매진';
  }
});

discountEl.addEventListener('input', e => {
  discount = e.target.value;
  if (isNaN(discount)) {
    e.target.value = '';
  }
});


product_update.addEventListener('click', async function () {
  await product(id, {
    title: name,
    price: price,
    description: text,
    tags: tag,
    thumbnailBase64: thumbnailImgBase64,
    photoBase64: photoImgBase64,
    isSoldOut: soldout,
    discountRate: discount
  });
  console.log('수정완료');
});