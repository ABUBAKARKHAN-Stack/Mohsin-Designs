import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { localizedString, localizedText } from './objects/localizedStringType'
import { seoType } from './objects/seoType'
import { heroSectionType } from './document/heroSection'
import { whatWeDoSectionType } from './document/whatWeDoSection'
import { pageType } from './document/pageType'
import { serviceType } from './document/serviceType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    localizedString,
    localizedText,
    seoType,
    heroSectionType,
    whatWeDoSectionType,
    pageType,
    serviceType
  ],
}
