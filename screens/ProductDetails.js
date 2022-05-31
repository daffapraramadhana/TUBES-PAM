import React, {useEffect, useState} from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet
  } from 'react-native';

export function ProductDetails({route}) {
  const { productId } = route.params;
  const [product, setProduct] = useState({});
  


  const getProduct = async (id) => {
    try {
     const response = await fetch(`https://backend-pam-uas.herokuapp.com/api/get_produk_by_id/${id}`);
     const json = await response.json();
     setProduct(json);
   } catch (error) {
     console.error(error);
   } finally {
     
   }
 }
  
  useEffect(() => {
    getProduct(productId);
  },[]);
  
  
  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          style={styles.image}
          source={product.url_gambar}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.nama_produk}</Text>
          <Text style={styles.price}>{product.harga_produk}</Text>
          <Text style={styles.description}>{product.deskripsi_produk}</Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
});
