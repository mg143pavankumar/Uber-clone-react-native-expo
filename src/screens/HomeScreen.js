import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { colors, parameters, SCREEN_WIDTH_HEIGHT } from "../global/styles";
import { Icon } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { images } from "../global/images";
import { carsAround, filterData } from "../global/data";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { mapStyle } from "../global/mapStyle";
import * as Location from "expo-location";

const HomeScreen = () => {
  const [latLng, setLatLng] = useState(null);

  const checkPermission = async () => {
    await Location.requestForegroundPermissionsAsync()
      .then(async (status) => {
        if (status.granted !== "granted") {
          const permission = await askPermission();

          return permission;
        }

        return true;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const askPermission = async () => {
    await Location.requestForegroundPermissionsAsync()
      .then((status) => {
        return status.granted === "granted";
      })
      .catch((err) => console.log(err.message));
  };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      // saving the current user location
      setLatLng({ latitude: latitude, longitude: longitude });
    } catch (err) {
      console.log(err.message);
    }
  };

  const _mapRef = useRef(1);

  useEffect(() => {
    checkPermission();
    getLocation();
  }, []);

  console.log(latLng);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon1}>
          <Icon
            type="material-community"
            name="menu"
            color={colors.white}
            size={40}
          />
        </View>
      </View>
      <ScrollView bounces={false}>
        <View style={styles.home}>
          <Text style={styles.text1}>Destress your commute</Text>
          <View style={styles.view1}>
            <View style={styles.view8}>
              <Text style={styles.text2}>
                Read a book. Take a nap. Stare out the windonw
              </Text>
              <View style={styles.button1}>
                <Text style={styles.button1Text}>Ride with Uber</Text>
              </View>
            </View>
            <View>
              <Image style={styles.image1} source={images.uberCarImg} />
            </View>
          </View>
        </View>
        <View>
          <FlatList
            bounces
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filterData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <View style={styles.view2}>
                    <Image style={styles.image2} source={item.image} />
                  </View>
                  <View>
                    <Text style={styles.title}>{item.name}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.view3}>
          <Text style={styles.text3}>Where to?</Text>
          <View style={styles.view4}>
            <Icon
              type="material-community"
              name="clock-time-four"
              size={26}
              color={colors.grey1}
            />
            <Text style={{ marginLeft: 5 }}>Now</Text>
            <Icon
              type="material-community"
              name="chevron-down"
              size={26}
              color={colors.grey1}
            />
          </View>
        </View>

        <View style={styles.view5}>
          <View style={styles.view6}>
            <View style={styles.view7}>
              <Icon
                type="material-community"
                name="map-marker"
                size={22}
                color={colors.black}
              />
            </View>
            <View>
              <Text style={{ fontSize: 18, color: colors.black }}>
                Tattiannaram
              </Text>
              <Text style={{ color: colors.grey3 }}>
                Sri Laxmi Ganapathi Colony
              </Text>
            </View>
          </View>
          <View>
            <Icon
              type="material-community"
              name="chevron-right"
              size={26}
              color={colors.grey}
            />
          </View>
        </View>
        <View style={{ ...styles.view5, borderBottomWidth: 0 }}>
          <View style={styles.view6}>
            <View style={styles.view7}>
              <Icon
                type="material-community"
                name="map-marker"
                size={22}
                color={colors.black}
              />
            </View>
            <View>
              <Text style={{ fontSize: 18, color: colors.black }}>
                Lb Nagar
              </Text>
              <Text style={{ color: colors.grey3 }}>Chandrapuri Coloy</Text>
            </View>
          </View>
          <View>
            <Icon
              type="material-community"
              name="chevron-right"
              size={26}
              color={colors.grey}
            />
          </View>
        </View>
        <Text style={styles.text4}>Around you</Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {latLng != null ? (
            <MapView
              ref={_mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              customMapStyle={mapStyle}
              showsUserLocation={true}
              followsUserLocation={true}
            >
              {carsAround.map((item, index) => {
                return (
                  <Marker
                    key={index}
                    coordinate={item}
                    image={images.carMarkerImg}
                  ></Marker>
                );
              })}
            </MapView>
          ) : (
            <ActivityIndicator size={28} color={colors.blue} />
          )}
        </View>
      </ScrollView>

      <StatusBar style="light" backgroundColor="#2058c0" translucent />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 30,
    paddingTop: parameters.statusBarHeight,
  },
  header: {
    backgroundColor: colors.blue,
    height: parameters.headerHeight,
    alignItems: "flex-start",
  },

  image1: {
    height: 100,
    width: 100,
  },

  image2: { height: 60, width: 60, borderRadius: 30 },

  home: {
    backgroundColor: colors.blue,
    paddingLeft: 20,
  },

  text1: {
    color: colors.white,
    fontSize: 21,
    paddingBottom: 20,
    paddingTop: 20,
  },

  text2: {
    color: colors.white,
    fontSize: 16,
  },

  view1: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 30,
  },

  button1: {
    height: 40,
    width: 150,
    backgroundColor: colors.black,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  button1Text: {
    color: colors.white,
    fontSize: 17,
    marginTop: -2,
  },
  card: {
    alignItems: "center",
    margin: SCREEN_WIDTH_HEIGHT.width / 22,
  },

  view2: { marginBottom: 5, borderRadius: 15, backgroundColor: colors.grey6 },

  title: {
    color: colors.black,
    fontSize: 16,
  },
  view3: {
    flexDirection: "row",
    marginTop: 5,
    height: 50,
    backgroundColor: colors.grey6,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  text3: { marginLeft: 15, fontSize: 20, color: colors.black },

  view4: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
  },

  view5: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 25,
    justifyContent: "space-between",
    marginHorizontal: 15,
    borderBottomColor: colors.grey4,
    borderBottomWidth: 1,
    flex: 1,
  },

  view6: {
    alignItems: "center",
    flex: 5,
    flexDirection: "row",
  },
  view7: {
    backgroundColor: colors.grey6,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  map: {
    height: 150,
    marginVertical: 0,
    width: SCREEN_WIDTH_HEIGHT.width * 0.92,
  },

  text4: {
    fontSize: 20,
    color: colors.black,
    marginLeft: 20,
    marginBottom: 20,
  },

  icon1: { marginLeft: 10, marginTop: 5 },

  view8: { flex: 4, marginTop: -25 },
  carsAround: {
    width: 28,
    height: 14,
  },

  location: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  view9: { width: 4, height: 4, borderRadius: 2, backgroundColor: "white" },
});
