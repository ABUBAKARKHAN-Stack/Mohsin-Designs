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
import { sectionHeadingType } from './objects/sectionHeadingType'
import { serviceCtaType } from './document/serviceCtaType'
import { localizedUrl } from './objects/localizedUrlType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    localizedString,
    localizedText,
    localizedUrl,
    sectionHeadingType,
    seoType,
    heroSectionType,
    whatWeDoSectionType,
    pageType,
    serviceType,
    serviceCtaType
  ],
}
