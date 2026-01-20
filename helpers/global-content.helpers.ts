import { sanityFetch } from "@/sanity/lib/live";

const GLOBAL_CONTENT_QUERY_BY_LOCALE = `{
  "stats": {
    "projectsDelivered": {
      "value": stats.projectsDelivered.value[$lang],
      "label": stats.projectsDelivered.label[$lang],
      "suffix": stats.projectsDelivered.suffix
    },
    "yearsExperience": {
      "value": stats.yearsExperience.value[$lang],
      "label": stats.yearsExperience.label[$lang],
      "suffix": stats.yearsExperience.suffix
    },
    "clientSatisfaction": {
      "value": stats.clientSatisfaction.value[$lang],
      "label": stats.clientSatisfaction.label[$lang],
      "suffix": stats.clientSatisfaction.suffix
    }
  },
  "servicesPreview": {
    "sectionHeading": {
      "eyebrow": servicesPreview.sectionHeading.eyebrow[$lang],
      "title": servicesPreview.sectionHeading.title[$lang],
      "description": servicesPreview.sectionHeading.description[$lang]
    }
  },
  "whyChooseUs": {
    "sectionHeading": {
      "eyebrow": whyChooseUs.sectionHeading.eyebrow[$lang],
      "title": whyChooseUs.sectionHeading.title[$lang],
      "description": whyChooseUs.sectionHeading.description[$lang]
    },
    "benefits": whyChooseUs.benefits[]{
      "title": title[$lang],
      "description": description[$lang],
      iconName
    }
  },
  "ourApproach": {
    "sectionHeading": {
      "eyebrow": ourApproach.sectionHeading.eyebrow[$lang],
      "title": ourApproach.sectionHeading.title[$lang],
      "description": ourApproach.sectionHeading.description[$lang]
    },
    "steps": ourApproach.steps[]{
      "title": title[$lang],
      "description": description[$lang],
      featured,
      iconName
    }
  },
  "industriesWeServe": {
    "sectionHeading": {
      "eyebrow": industriesWeServe.sectionHeading.eyebrow[$lang],
      "title": industriesWeServe.sectionHeading.title[$lang],
      "description": industriesWeServe.sectionHeading.description[$lang]
    },
    "industries": industriesWeServe.industries[]{
      "name": name[$lang],
      "description": description[$lang],
      iconName
    }
  },
  "leadership": {
    "sectionHeading": {
      "eyebrow": leadership.sectionHeading.eyebrow[$lang],
      "title": leadership.sectionHeading.title[$lang],
      "description": leadership.sectionHeading.description[$lang]
    },
    "founder": {
      "name": leadership.founder.name[$lang],
      "role": leadership.founder.role[$lang],
      "image": leadership.founder.image.asset->{
        _id,
        url
      },
      "socialLinks": leadership.founder.socialLinks[]{
        platform,
        url
      }
    },
    "agencyStructure": leadership.agencyStructure[]{
      "title": title[$lang],
      "description": description[$lang],
      featured,
      iconName
    }
  },
  "cta": {
    "badge": cta.badge[$lang],
    "heading": cta.heading[$lang],
    "description": cta.description[$lang],
    "benefits": cta.benefits[]{"text": text[$lang]},
    "formId": cta.formId._ref
  }
}`;

export async function getGlobalContent(lang: string) {
    try {
        const { data } = await sanityFetch({
            query: `*[_type == "globalContent"][0] ${GLOBAL_CONTENT_QUERY_BY_LOCALE}`,
            params: { lang },
            perspective: "published"
        });
        return data;
    } catch (error) {
        console.error("Failed to fetch global content:", error);
        return null;
    }
}

export const GLOBAL_CONTENT_FULL_QUERY = `*[_type == "globalContent"][0] {
  ...,
  leadership {
    ...,
    founder {
      ...,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }
}`;
