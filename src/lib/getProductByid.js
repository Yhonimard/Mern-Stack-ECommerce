export async function getProduct() {
  const res = await fetch(`${process.env.HOST_URL}/api/products/get`);
  const data = res.json();

  return data;
}

export async function getProductById(pid) {
  const res = await fetch(`${process.env.HOST_URL}/api/products/get/${pid}`);
  const data = res.json();
  return data;
}
