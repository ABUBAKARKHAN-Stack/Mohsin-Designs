import { sanityFetch } from "@/sanity/lib/live";

export async function getGlobalSections(lang: string) {
  const query = `*[_type == "globalSections" && _id == "globalSections"][0]{
    stats {
      projectsDelivered {
        value,
        "label": label.${lang},
        suffix
      },
      yearsExperience {
        value,
        "label": label.${lang},
        suffix
      },
      clientSatisfaction {
        value,
        "label": label.${lang},
        suffix
      }
    },
    servicesPreview {
      sectionHeading {
        "eyebrow": eyebrow.${lang},
        "title": title.${lang},
        "description": description.${lang}
      }
    },
    whyChooseUs {
      sectionHeading {
        "eyebrow": eyebrow.${lang},
        "title": title.${lang},
        "description": description.${lang}
      },
      benefits[] {
        _key,
        "title": title.${lang},
        "description": description.${lang},
        iconName
      }
    },
    ourApproach {
      sectionHeading {
        "eyebrow": eyebrow.${lang},
        "title": title.${lang},
        "description": description.${lang}
      },
      steps[] {
        _key,
        "title": title.${lang},
        "description": description.${lang},
        featured,
        iconName
      }
    },
    industriesWeServe {
      sectionHeading {
        "eyebrow": eyebrow.${lang},
        "title": title.${lang},
        "description": description.${lang}
      },
      industries[] {
        _key,
        "name": name.${lang},
        "description": description.${lang},
        iconName
      }
    },
    faqs {
      sectionHeading {
        "eyebrow": eyebrow.${lang},
        "title": title.${lang},
        "description": description.${lang}
      },
      faqItems[] {
        _key,
        "question": question.${lang},
        "answer": answer.${lang}
      },
      "buttonText": buttonText.${lang},
      "buttonUrl": buttonUrl.${lang}
    },
    leadership {
      sectionHeading {
        "eyebrow": eyebrow.${lang},
        "title": title.${lang},
        "description": description.${lang}
      },
      founder {
        "name": name.${lang},
        "role": role.${lang},
        image {
          "url": asset->url,
          "_id": asset->_id,
          "altText": asset->altText.${lang}
        },
        socialLinks[] {
          _key,
          platform,
          url
        }
      },
      agencyStructure[] {
        _key,
        "title": title.${lang},
        "description": description.${lang},
        featured,
        iconName
      }
    },
    cta {
      "badge": badge.${lang},
      "heading": heading.${lang},
      "description": description.${lang},
      benefits[] {
        _key,
        "text": text.${lang}
      },
      "formId": formId->_id
    }
  }`;

  try {
    const { data } = await sanityFetch({ query });
    return data;
  } catch (error) {
    console.error("Error fetching global sections:", error);
    return null;
  }
}
