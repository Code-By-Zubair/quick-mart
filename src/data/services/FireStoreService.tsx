import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";

const userId = auth().currentUser?.uid;
const usersCollection = firestore().collection("users");
const categoriesCollection = firestore().collection("categories");
const productAdvertisementsCollection = firestore().collection(
  "product-advertisements"
);
const productsCollection = firestore().collection("products");
const wishListCollection = firestore().collection("wishlist");
const cartCollection = firestore().collection("cart");

const addUser = async (userData: any) => {
  try {
    await usersCollection.add(userData);
  } catch (error) {
    console.error("Error adding user: ", error);
    Toast.show({
      type: "error",
      text1: "Error adding user",
    });
  }
};
const getCategoriesSnapshot = (p0: (fetchedCategories: any) => void) => {
  return categoriesCollection.onSnapshot((snapshot) => {
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    p0(categories);
  });
};

const getProductAdvertisementsSnapshot = (p0: (fetchedAds: any) => void) => {
  return productAdvertisementsCollection
    .where("isActive", "==", true)
    .onSnapshot((snapshot) => {
      const ads = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      p0(ads);
    });
};

// get latest 5 products with stream
const getLatestProductsSnapshot = (p0: (fetchedProducts: any) => void) => {
  return productsCollection
    .orderBy("createdAt", "desc")
    .limit(5)
    .onSnapshot((snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      p0(products);
    });
};

// get five categories with stream
const getFiveCategoriesSnapshot = (p0: (fetchedCategories: any) => void) => {
  return categoriesCollection.limit(5).onSnapshot((snapshot) => {
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    p0(categories);
  });
};
const getAllProductsSnapshot = (
  callback: (products: any[]) => void,
  categoryId?: string
) => {
  const collectionRef = productsCollection;
  const query = categoryId
    ? collectionRef.where("categoryId", "==", categoryId)
    : collectionRef;

  return query.onSnapshot((snapshot) => {
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(products);
  });
};

// add or remove product from favorites
const toggleFavoriteProduct = async (productId: string) => {
  try {
    const data = wishListCollection
      .where("productId", "==", productId)
      .where("userId", "==", userId);
    const snapshot = await data.get();
    if (snapshot.empty) {
      // If the product is not in the wishlist, add it
      await wishListCollection.add({
        productId,
        userId,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    } else {
      // If the product is in the wishlist, remove it
      const docId = snapshot.docs[0].id;
      await wishListCollection.doc(docId).delete();
    }
  } catch (error) {
    console.error("Error toggling favorite product: ", error);
    Toast.show({
      type: "error",
      text1: "Error toggling favorite product",
    });
  }
};

// get user favourites stream
const getUserFavoritesSnapshot = (callback: (favorites: any[]) => void) => {
  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  return wishListCollection
    .where("userId", "==", userId)
    .onSnapshot((snapshot) => {
      const favorites = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(favorites);
    });
};

const fetchProductsByListOfIds = async () => {
  try {
    // fetch user favorites

    if (!userId) {
      throw new Error("User not authenticated");
    }
    const wishlistSnapshot = await wishListCollection
      .where("userId", "==", userId)
      .get();
    const products: any[] = [];
    for (const doc of wishlistSnapshot.docs) {
      const productId = doc.data().productId;
      const productDoc = await productsCollection.doc(productId).get();
      if (productDoc.exists) {
        products.push({ ...productDoc.data() });
      }
    }
    return products;
  } catch (error) {
    console.error("Error fetching products by list of IDs: ", error);
    throw error;
  }
};
const addProductToCart = async (
  productId: string,
  color: string,
  size: string,
  quantity: number
) => {
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const cartItem = {
      productId,
      userId,
      quantity,
      color,
      size,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    const existingCartItem = await cartCollection
      .where("productId", "==", productId)
      .where("userId", "==", userId)
      .get();
    if (existingCartItem.empty) {
      await cartCollection.add(cartItem);
      Toast.show({
        type: "success",
        text1: "Product added to cart",
      });
    } else {
      const docId = existingCartItem.docs[0].id;
      await cartCollection.doc(docId).update({
        quantity: quantity,
        color,
        size,
      });
      Toast.show({
        type: "success",
        text1: "Product updated in cart",
      });
    }
  } catch (error) {
    console.error("Error adding product to cart: ", error);
    Toast.show({
      type: "error",
      text1: "Error adding product to cart",
    });
  }
};

const getUserCart = async () => {
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const cartSnapshot = await cartCollection
      .where("userId", "==", userId)
      .get();
    const cartItems = cartSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // return cartItems;
    //get product details for each cart item
    const products = await Promise.all(
      cartItems.map(async (item) => {
        const productDoc = await productsCollection.doc(item.productId).get();
        if (productDoc.exists) {
          return {
            id: item.id,
            ...item,
            productDetails: { id: productDoc.id, ...productDoc.data() },
          };
        } else {
          return null; // or handle the case where the product does not exist
        }
      })
    );
    console.log("fetched user cart: ", products);
    return products.filter((item) => item !== null); // filter out null items
  } catch (error) {
    console.error("Error fetching user cart: ", error);
    throw error;
  }
};
const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }
    console.log("Updating cart item: ", cartItemId, " to quantity: ", quantity);
    const cartItemRef = cartCollection.doc(cartItemId);
    await cartItemRef.update({ quantity });
  } catch (error) {
    console.error("Error updating cart item quantity: ", error);
    Toast.show({
      type: "error",
      text1: "Error updating cart item quantity",
    });
  }
};

const deleteCartItem = async (cartItemId: string) => {
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }
    await cartCollection.doc(cartItemId).delete();
  } catch (error) {
    console.error("Error deleting cart item: ", error);
    Toast.show({
      type: "error",
      text1: "Error deleting cart item",
    });
  }
};

export {
  addUser,
  getCategoriesSnapshot,
  getProductAdvertisementsSnapshot,
  getLatestProductsSnapshot,
  getFiveCategoriesSnapshot,
  toggleFavoriteProduct,
  getAllProductsSnapshot,
  getUserFavoritesSnapshot,
  fetchProductsByListOfIds,
  addProductToCart,
  getUserCart,
  updateCartItemQuantity,
  deleteCartItem,
};
