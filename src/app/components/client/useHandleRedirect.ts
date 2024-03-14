/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getMontNumberFromName, getMonthKeyFromNumber, parsePathName } from '@/app/utils'
import { Months, Years } from '@/app/constants'
import { MonthKey } from '@/app/types'


export const useHandleRedirect = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { monthNumber, year } = parsePathName(pathname)


    const [currentMonth, setCurrentMonth] = useState<Months>(Months?.[getMonthKeyFromNumber(monthNumber) as MonthKey])

    const [currentYear, setCurrentYear] = useState<Years>(year as Years)

    useEffect(() => {

        const monthNum = getMontNumberFromName(currentMonth)

        router.push(`/${currentYear}/${monthNum}`)
    }, [currentMonth])

    useEffect(() => {
        const monthNum = getMontNumberFromName(currentMonth)

        router.push(`/${currentYear}/${monthNum}`)
    }, [currentYear])

    return { currentMonth, currentYear, setCurrentMonth, setCurrentYear }
} 