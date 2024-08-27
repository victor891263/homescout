export type TTenure = 'freehold' | 'leasehold' | 'share of freehold'

export type TPropertyType = 'terraced house' | 'flat' | 'land' | 'semi-detached house' | 'detached house' | 'end terrace house' | 'parking/garage' | 'town house' | 'cottage' | 'studio' | 'link-detached house' | 'detached bungalow' | 'bungalow' | 'semi-detached bungalow' | 'block of flats' | 'villa' | 'maisonette' | 'barn conversion' | 'mews house'

export interface IPropertyMini {
    id: number
    date_posted: string
    price: number
    address: string
    bathrooms: number
    bedrooms: number
    floors: number
    type: TPropertyType
    tenure: TTenure
    description: string
    image?: string
}

export interface IProperty extends IPropertyMini {
    size: string
    marketer_id: number
    marketer_name?: number
    marketer_image?: string
    marketer_phone?: string
    marketer_email: string
}

export interface IUser {
    id: number
    name?: string
    email: string
    phone?: string
    address?: string
    about?: string
}