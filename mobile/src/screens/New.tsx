import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";


import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { api } from "../lib/axios";

const avaliableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira','Sábado']

export function New() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateNewHabit() {
    try {
      if(!title.trim() || weekDays.length === 0) {
        return Alert.alert('Novo hánbito', 'informeo nome do hábito e escolha a periodicidade')
      }

      await api.post('/habits', {
        title,
        weekDays
      })

      setTitle('')
      setWeekDays([])

      Alert.alert('novo habito', 'criado com sucesso')

      
    } catch (error) {
      Alert.alert('Ops', 'Houve um erro')
      console.log(error)
    } 
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100}}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento
        </Text>
        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-zinc-800 border-2 focus:border-green-600"
          placeholder="Exercicios, dormir bem, etc... "
          placeholderTextColor={colors.zinc[400]}
          value={title}
          onChangeText={setTitle}
        />
        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual seu comprometimento
        </Text>
        {
          avaliableWeekDays.map((weekDay, index) => (
            <Checkbox 
              key={weekDay}
              title={weekDay}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />
          ))
        }

      <TouchableOpacity
        onPress={handleCreateNewHabit}
        activeOpacity={0.7}
        className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
      >
        <Feather 
          name="check"
          size={20}
          color={colors.white}
        />
        <Text className="font-semibold text-base text-white ml-2">
          Confirmar
        </Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  )
}