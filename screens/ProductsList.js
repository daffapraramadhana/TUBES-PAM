import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { Product } from "../components/Product.js";

export function ProductsList({ navigation }) {
  function renderProduct({ item: product }) {
    return (
      <Product
        {...product}
        onPress={() => {
          navigation.navigate("ProductDetails", {
            productId: product.id,
          });
        }}
      />
    );
  }

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch(
        "https://backend-pam-uas.herokuapp.com/api/get_all_produk"
      );
      const json = await response.json();
      setProducts(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const [kategori, setKategori] = useState([
    {
      nama: "Handphone",
    },
    {
      nama: "Laptop",
    },
    {
      nama: "Charger",
    },
    {
      nama: "Casing",
    },
    {
      nama: "Pakaian",
    },
    {
      nama: "Makanan",
    },
    {
      nama: "Alat",
    },
  ]);

  const [kategoriSeleksi, setKategoriSeleksi] = useState({
    nama: "Handphone",
  });

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
        <View style={{ marginHorizontal: 20, marginBottom: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "#212121" }}>
            resep<Text style={{ color: "#4169e1" }}>ku</Text>
          </Text>
        </View>
        <View>
          <FlatList
            data={kategori}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginLeft: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  marginRight: 5,
                  backgroundColor:
                    kategoriSeleksi.nama == item.nama ? "#4169e1" : "#fff",
                  elevation: 3,
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  marginBottom: 10,
                  borderRadius: 15,
                  marginLeft: 5,
                }}
                onPress={() => setKategoriSeleksi(item)}
              >
                <Text
                  style={{
                    color:
                      kategoriSeleksi.nama == item.nama ? "#fff" : "#212121",
                  }}
                >
                  {item.nama}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 10,
            marginTop: 20,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#212121" }}
            >
              Trending
            </Text>
          </View>

          <TouchableOpacity
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              flex: 1,
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 14 }}>Lihat Semua</Text>
            <Icon name="chevron-forward" size={20} color="#bdbdbd" />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          style={styles.productsList}
          contentContainerStyle={styles.productsListContainer}
          keyExtractor={(item) => item.id.toString()}
          data={products}
          renderItem={renderProduct}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: "#eeeeee",
    marginRight: 5,
    backgroundColor: "#fff",
    elevation: 3,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    borderRadius: 15,
    marginLeft: 5,
  },
  productsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
