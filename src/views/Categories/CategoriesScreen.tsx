import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { getCategoriesSnapshot } from "../../data/services/FireStoreService";
import AppColors from "../../constants/App_colors";
import AppText from "../../components/AppText";
import AppbarWithTitle from "../../components/AppbarWithTitle";
import Category from "../../types/CategoriesTypes";
import { AppFonts } from "../../assets/AppFonts";
import { useNavigation } from "@react-navigation/native";

const CategoriesScreen = () => {
  const nav: any = useNavigation();
  const { width } = Dimensions.get("window");
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    try {
      const unsubscribe = getCategoriesSnapshot((fetchedCategories) => {
        setCategories(fetchedCategories);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching categories: ", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);
  return (
    <View style={styles.mainView}>
      <AppbarWithTitle title="Categories" />
      {loading && categories.length === 0 ? (
        <ActivityIndicator
          size={50}
          color={AppColors.primary}
          style={{ alignSelf: "center", flex: 1, justifyContent: "center" }}
        />
      ) : !loading && categories.length === 0 ? (
        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
        >
          <AppText
            text="No Categories Available"
            customStyle={{
              color: AppColors.secondary,
              textAlign: "center",
              fontFamily: AppFonts.JakartaBold,
            }}
          />
        </View>
      ) : (
        <FlatList
          data={categories}
          numColumns={2}
          overScrollMode="never"
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingBottom: 16,
            alignItems: "center",
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Category }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                nav.navigate("products", { categoryId: item.id });
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  margin: 8,
                  borderWidth: 2,
                  borderColor: AppColors.grey50,
                  paddingVertical: 22,
                  width: width / 2 - 32,
                  borderRadius: 16,
                }}
              >
                <AppText text={item.emoji} customStyle={[{ fontSize: 32 }]} />
                <AppText
                  text={item.title}
                  customStyle={{
                    fontFamily: AppFonts.JakartaSemiBold,
                    fontSize: 12,
                    color: AppColors.secondary,
                    textAlign: "center",
                    marginTop: 2,
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  mainView: { paddingTop: 50, flex: 1, backgroundColor: AppColors.background },
});
