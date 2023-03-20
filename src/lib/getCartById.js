export async function getCart() {
  const res = await fetch(`${process.env.HOST_URL}/api/cart/get`);
  const data = res.json();

  return data;
}

export async function getCartById(cid) {
  const res = await fetch(`${process.env.HOST_URL}/api/cart/get/${cid}`);
  const data = res.json();
  return data;
}
