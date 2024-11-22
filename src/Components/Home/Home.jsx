import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";

export default function Home() {
  const [products, setproduct] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getproduct();
  }, []);
  async function getproduct() {
    setLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setproduct(data.data);
    setLoading(false);
  }
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {loading ? (
          <Loading />
        ) : (
          products.map((product, id) => {
            return <Product product={product} key={id} />;
          })
        )}
      </div>
    </>
  );
}
