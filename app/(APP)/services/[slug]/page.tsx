import { PageWrapper } from '@/components/layout'
import React from 'react'

type Props = {
    params: Promise<{slug:string}>
}

const ServiceDetailsPage =  async ({params}:Props) => {
    const {
        slug
    } = await params
  return (
    <PageWrapper>ServiceDetailsPage {slug}</PageWrapper>
  )
}

export default ServiceDetailsPage