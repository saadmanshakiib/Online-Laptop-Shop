import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

function Homepage() {
    const [laptops, setLaptops] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:9000/laptops")
            .then((res) => res.json())
            .then((data) => {
                setLaptops(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h2 className="text-center mt-5">Loading...</h2>;
    }

    return (
        <div className="container mt-5">
            <button
                className="btn btn-secondary mb-4"
                onClick={() => navigate("/")}
            >
                ← Back to Sign In
            </button>
            <h2 className="text-center mb-4">Latest Laptops</h2>

            <div className="row">
                {laptops.map((laptop) => (
                    <div className="col-md-4 mb-4" key={laptop.sku}>
                        <div className="card shadow h-100">
                            <img
                                src="https://placehold.co/600x400?text=Laptop"
                                className="card-img-top"
                                alt={laptop.modelName}
                            />

                            <div className="card-body">
                                <h4 className="card-title">{laptop.modelName}</h4>

                                <p>
                                    <strong>Brand:</strong> {laptop.brand.name}
                                </p>

                                <p>
                                    <strong>Category:</strong> {laptop.category.category}
                                </p>

                                <p>
                                    <strong>Description:</strong> {laptop.description}
                                </p>

                                <p>
                                    <strong>Release Year:</strong> {laptop.releaseYear}
                                </p>

                                <p>
                                    <strong>Stock:</strong> {laptop.stockQuantity}
                                </p>

                                {laptop.discountPrice ? (
                                    <>
                                        <p className="text-danger fs-5">
                                            <strong>${laptop.discountPrice}</strong>
                                        </p>

                                        <p>
                                            <del>${laptop.price}</del>
                                        </p>
                                    </>
                                ) : (
                                    <p className="fs-5">
                                        <strong>${laptop.price}</strong>
                                    </p>
                                )}

                                <button className="btn btn-primary w-100">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Homepage;