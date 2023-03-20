export async function getCart() {
  const res = await fetch("http://localhost:3000/api/cart/get");
  const data = res.json();

  return data;
}

export async function getCartById(cid) {
  const res = await fetch(`http://localhost:3000/api/cart/get/${cid}`);
  const data = res.json();
  return data;
}
