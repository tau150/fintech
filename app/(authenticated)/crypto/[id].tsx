import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { SectionList, Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'

const categories = ['Overview', 'News', 'Orders', 'Transactions'];

const CryptoDetails = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { id } = useLocalSearchParams()
  const headerHeight = useHeaderHeight()

  const { data } = useQuery({
    queryKey: ['info', id],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
      return info[+id];
    },
  });

  return (
    <>
      <Stack.Screen options={{ title: data?.name}} />
      <SectionList
        style={{ marginTop: headerHeight}}
        contentInsetAdjustmentBehavior='automatic'
        sections={[{data: [{title: 'chart'}]}]}
        keyExtractor={(i => i.title)}
        renderSectionHeader={() => (
          <ScrollView horizontal={true} contentContainerStyle={styles.stickyHeaderScrollView}>
            {categories.map( (item, index) => (
              <TouchableOpacity key={index} style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn} onPress={() => setActiveIndex(index)}>
                <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 16,
            }}>
            <Text style={styles.subtitle}>{data?.symbol}</Text>
            <Image source={{ uri: data?.logo }} style={{ width: 60, height: 60 }} />
          </View>
          <View style={{ flexDirection: 'row', gap: 10, margin: 12 }}>
            <TouchableOpacity
              style={[
                defaultStyles.pillButtonSmall,
                { backgroundColor: Colors.primary, flexDirection: 'row', gap: 16 },
              ]}>
              <Ionicons name="add" size={24} color={'#fff'} />
              <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                defaultStyles.pillButtonSmall,
                { backgroundColor: Colors.primaryMuted, flexDirection: 'row', gap: 16 },
              ]}>
              <Ionicons name="arrow-back" size={24} color={Colors.primary} />
              <Text style={[defaultStyles.buttonText, { color: Colors.primary }]}>Receive</Text>
            </TouchableOpacity>
          </View>
        </>
        )}
        renderItem={({ item}) => <>
        {/*CHART */}
        <View style={{height: 500, backgroundColor: 'green'}}>

        </View>
        <View style={[defaultStyles.block, { marginTop: 20 }]}>
          <Text style={styles.subtitle}>Overview</Text>
          <Text style={{ color: Colors.gray }}>
            Bitcoin is a decentralized digital currency, without a central bank or single
            administrator, that can be sent from user to user on the peer-to-peer bitcoin
            network without the need for intermediaries. Transactions are verified by network
            nodes through cryptography and recorded in a public distributed ledger called a
            blockchain.
          </Text>
        </View>
        </> }>


      </SectionList>
    </>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.gray,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#000',
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  stickyHeaderScrollView: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: Colors.background,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default CryptoDetails