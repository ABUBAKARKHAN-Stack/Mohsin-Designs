import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      S.documentTypeListItem('service').title('Service'),
      S.listItem()
        .title('Service CTA')
        .id('serviceCta')
        .child(
          S.document()
            .schemaType('serviceCta')
            .documentId('serviceCta')
        ),
      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', "service", "serviceCta"].includes(item.getId()!),
      ),
    ])
