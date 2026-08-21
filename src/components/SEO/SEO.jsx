import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useCalculators } from "../../context/CalculatorsContext";
import { seoConfig, getSEOData } from "../../utils/seo-config";

const SEO = ({
  title,
  description,
  keywords,
  pageKey,
  canonical,
  schemaData,
}) => {
  const location = useLocation();
  const { calculatorsData = [] } = useCalculators();

  const seoData = pageKey ? getSEOData(pageKey) : {};

  const matchedCalculator = (() => {
    const flatCalculators = (calculatorsData || []).flatMap(
      (category) => category.calculators || [],
    );
    const currentPath = (location.pathname || "/").replace(/\/+$/, "") || "/";
    const currentSlug =
      currentPath === "/" ? "" : currentPath.replace(/^\//, "");
    const slugCandidates = [
      pageKey,
      currentSlug,
      currentSlug?.replace(/-calculator$/, ""),
      pageKey?.replace(/-calculator$/, ""),
    ].filter(Boolean);

    return flatCalculators.find((calculator) => {
      const calculatorSlug = calculator.slug;
      const calculatorPath = calculator.path || `/${calculatorSlug || ""}`;
      const normalizedPath = calculatorPath
        .replace(/\/+$/, "")
        .replace(/^\//, "");
      const normalizedCurrentPath = currentSlug.replace(/\/+$/, "");

      return slugCandidates.some((candidate) => {
        const normalizedCandidate = candidate
          .replace(/\/+$/, "")
          .replace(/^\//, "");
        return (
          calculatorSlug === normalizedCandidate ||
          normalizedPath === normalizedCandidate ||
          normalizedCurrentPath === normalizedCandidate
        );
      });
    });
  })();

  const finalTitle =
    title ||
    matchedCalculator?.meta_title ||
    matchedCalculator?.name ||
    seoData.title ||
    seoConfig.defaultTitle;
  const finalDescription =
    description ||
    matchedCalculator?.meta_description ||
    matchedCalculator?.description ||
    seoData.description ||
    seoConfig.defaultDescription;
  const finalKeywords =
    keywords ||
    matchedCalculator?.meta_keywords ||
    seoData.keywords ||
    seoConfig.defaultKeywords;

  const normalizePath = (path = "/") => {
    const cleaned = path
      .replace(/\/\/+/g, "/")
      .replace(/\/+$/g, "");

    const withLeadingSlash = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
    return withLeadingSlash === "" ? "/" : withLeadingSlash;
  };

  const normalizeSiteUrl = (url = "") => url.replace(/\/+$/g, "");

  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const finalPath = normalizePath(location.pathname);
  const siteUrl = normalizeSiteUrl(seoConfig.siteUrl);
  const hostCanonical = `${siteUrl}${finalPath}`;
  const canonicalCandidate = canonical || hostCanonical;
  const finalCanonical = isValidUrl(canonicalCandidate)
    ? canonicalCandidate
    : hostCanonical;

  const isCanonicalValid = isValidUrl(finalCanonical);

  const finalSchemaData = schemaData
    ? {
        ...schemaData,
        name: finalTitle,
        description: finalDescription,
        url: finalCanonical,
      }
    : schemaData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />

      {/* Canonical URL */}
      {isCanonicalValid && <link rel="canonical" href={finalCanonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:site_name" content={seoConfig.siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalCanonical} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      {seoConfig.twitterHandle && (
        <meta property="twitter:site" content={seoConfig.twitterHandle} />
      )}

      {/* Structured Data */}
      {finalSchemaData && (
        <script type="application/ld+json">
          {JSON.stringify(finalSchemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
