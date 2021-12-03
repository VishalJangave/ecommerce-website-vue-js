import axios from "axios";
const productList = {
    state: {
        productlist: [],
    },
    getters: {
        getproductlist: (state) => {
            return state.productlist
        },
    },
    mutations:
    {
        getproducts: (state, product) => {
            state.productlist = product;
        },
        deleteProductById: (state, id) => {
            state.productlist = state.productlist.filter(product => product.id != id)
        },
        addProductData: (state, product) => {
            state.productlist = product;
        },
        updateProductData: (state, product) => {
            state.productlist = product;
        },
    },
    actions: {
        async getproductdata(context) {
            console.log("this is get data")
            const response = await axios.get("http://localhost:4000/api/product");
        
                context.commit("getproducts", response.data)
           
        },
        async deleteproduct({ commit }, id) {
            await axios.delete("http://localhost:4000/api/product/" + id);
            commit("deleteProductById", id)
        },
        async addProduct({ commit }, product) {
            const response = await axios.post("http://localhost:4000/api/product", product);
            commit("addProductData", response.data)
        },
        async updateProduct({ commit }, product) {
            try {
                const response = await axios.patch("http://localhost:4000/api/product/" + product._id, product)
                   commit("updateProductData", response.data)
            } catch (err) {
                console.log("err=", err)
            }

        },
    }

}
export default productList
