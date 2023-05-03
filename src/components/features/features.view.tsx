import React from "react";
import styles from "./features.module.scss";
import "animate.css";
import { getTranslateValue } from "@components/translate/Language";
import landingPageEPosta from "@assets/images/landing-page-eposta.jpg";
import landingPageManagement from "@assets/images/landing-page-management.jpg";
import landingPageOfficeApplication from "@assets/images/landing-page-office-applications.jpg";
import landingPageVideoConferencing from "@assets/images/landing-page-video-conferencing.jpg";

export const FeaturesView = (props: Props) => {
  const { check798px } = props;
  let contents = document.getElementsByClassName(styles.featuresContent);
  let contentImages = document.getElementsByClassName(styles.featureImage);

  const stickyNavigation = () => {
    if (contentImages[0]) {
      let stickyImage = contentImages[0].getBoundingClientRect() || {};
      let topSize = stickyImage.height / 2 + stickyImage.top;
      for (let i = 0; i < contents.length; i++) {
        const element = contents[i];
        if (
          element.getBoundingClientRect().top < topSize &&
          element.getBoundingClientRect().top > 100
        ) {
          for (let j = 0; j < contentImages.length; j++) {
            const image = contentImages[j];
            if (
              image.getAttribute("id") ===
              `content-image-${element.getAttribute("data-target")}`
            ) {
              image.classList.add(styles.z1);
              image.classList.remove(styles.z0);
              image.classList.add(
                "animate__animated",
                "animate__fadeIn",
                "animate__fast"
              );
            } else {
              image.classList.remove(styles.z1);
              image.classList.add(styles.z0);
              image.classList.remove(
                "animate__animated",
                "animate__fadeIn",
                "animate__fast"
              );
            }
          }
        }
      }
    }
  };

  window.addEventListener("scroll", stickyNavigation);

  const handleFeaturesContent = [
    {
      id: "content-1",
      dataTarget: "1",
      image: landingPageEPosta,
    },
    {
      id: "content-2",
      dataTarget: "2",
      image: landingPageManagement,
    },
    {
      id: "content-3",
      dataTarget: "3",
      image: landingPageOfficeApplication,
    },
    {
      id: "content-4",
      dataTarget: "4",
      image: landingPageVideoConferencing,
    },
  ];

  const renderContent = () => {
    if (check798px) {
      return (
        <div id="features" className={styles.features}>
          <div className={styles.featuresTitle}>
            <h2>
              {getTranslateValue(
                "features-main-header",
                "İşte Suit ile neler yapabilirsiniz?"
              )}
            </h2>
            <p>
              {getTranslateValue(
                "features-main-subheader",
                "Turkcell tarafından geliştirilen İşte Suit ile verileriniz Turkcell Veri Merkezlerinde korunur. İşte Suit ile kurumunuzun mail, dosya yönetimi, ofis uygulamaları ve video konferans çözümünü kolay ve sade ara yüzle karşılayın."
              )}
            </p>
          </div>
          <div className={styles.featuresContents}>
            {handleFeaturesContent.map((item) => (
              <div
                key={item.id}
                id={item.id}
                data-target={item.dataTarget}
                className={styles.featuresContent}
              >
                <h3>
                  <div dangerouslySetInnerHTML={{__html: getTranslateValue(
                      "features-header-" + item.dataTarget,
                      "Yerli Çözüm Lorem İpsum"
                    )}} />
                </h3>
                <p>
                  <div dangerouslySetInnerHTML={{__html: getTranslateValue(
                      "features-content-"  + item.dataTarget,
                      "Turkcell tarafından geliştirilen İşte Suit ile verileriniz Turkcell Veri Merkezlerinde korunur. İşte Suit ile kurumunuzun mail, dosya yönetimi, ofis uygulamaları ve video konferans çözümünü karşılayın."
                    )}} />
                </p>
                <img src={item.image} alt="image" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div id="features" className={styles.features}>
        <div className={styles.featuresTitle}>
          <h2>
            {getTranslateValue(
              "features-main-header",
              "İşte Suit ile neler yapabilirsiniz?"
            )}
          </h2>
          <p>
            {getTranslateValue(
              "features-main-subheader",
              "Turkcell tarafından geliştirilen İşte Suit ile verileriniz Turkcell Veri Merkezlerinde korunur. İşte Suit ile kurumunuzun mail, dosya yönetimi, ofis uygulamaları ve video konferans çözümünü kolay ve sade ara yüzle karşılayın."
            )}
          </p>
        </div>
        <div className={styles.featuresScroll}>
          <div className={styles.featuresImages}>
            <div className={styles.featuresImageArea}>
              <div id="content-image-1" className={styles.featureImage}>
                <img src={landingPageEPosta} alt="" />
              </div>
              <div id="content-image-2" className={styles.featureImage}>
                <img src={landingPageManagement} alt="" />
              </div>
              <div id="content-image-3" className={styles.featureImage}>
                <img src={landingPageOfficeApplication} alt="" />
              </div>
              <div id="content-image-4" className={styles.featureImage}>
                <img src={landingPageVideoConferencing} alt="" />
              </div>
            </div>
          </div>

          <div className={styles.featuresContents}>
            {handleFeaturesContent.map((item) => (
              <div
                key={item.id}
                id={item.id}
                data-target={item.dataTarget}
                className={styles.featuresContent}
              >
                {item.dataTarget === "1" && (
                  <div>
                    <h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getTranslateValue(
                            "features-header-1",
                            "<b>YaaniMail Kurumsal<b>"
                          ),
                        }}
                      />
                    </h3>
                    <p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getTranslateValue(
                            "features-content-1",
                            '<br><div style="text-align:justify">İşte Suit içerisinde yer alan mail platformumuz ile;<br/>&nbsp;<div style="text-align:justify">- Turkcell veri merkezlerinde verileriniz güvende,<br/>&nbsp;<div style="text-align:justify">- Takvimler Kurallar ve Otomatik Yanıtlayıcı gibi öne çıkan gelişmiş kurumsal özellikler ile işinizi kolaylıkla yönetebilirsiniz.<br/>&nbsp;<div style="text-align:justify">- Web, iOS, android uygulamalarından ya da kullanıcı alışkanlığınızı değiştirmeden diğer uygulamalar üzerinden e-postanıza erişebilirsiniz.<br/>&nbsp;<div style="text-align:justify">- Global Adres Defteri, Relay, LDAP, karantina entegrasyonu gibi kullanım kolaylığı sağlayan özellikler ile işlerinizi güvenli ve kolay takip edebilirsiniz.'
                          ),
                        }}
                      />
                    </p>
                  </div>
                )}
                {item.dataTarget === "2" && (
                  <div>
                    <h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getTranslateValue(
                            "features-header-2",
                            "<b>Lifebox Business<b>"
                          ),
                        }}
                      />
                    </h3>
                    <p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getTranslateValue(
                            "features-content-2",
                            '<br><div style="text-align:justify">İşte Suit içerisinde yer alan drive platformumuz ile;<br>&nbsp;<div style="text-align:justify">- Bulut tabanlı ofis özelliği ile gerçek zamanlı ortak çalışabilirsiniz<br>&nbsp;<div style="text-align:justify">- Kurum içi veya kurum dışı dosya paylaşım alternatiflerine ulaşabilirsiniz.<br>&nbsp;<div style="text-align:justify">- Dosyalardaki değişikliklerin versiyonlar halinde saklanması ve istenilen versiyona anında ulaşabilirsiniz.<br>&nbsp;<div style="text-align:justify">- Kullanıcı ve dosya hareketleri üzerinden kişiselleştirilmiş rapor alabilirsiniz.'
                          ),
                        }}
                      />
                    </p>
                  </div>
                )}
                {item.dataTarget === "3" && (
                  <div>
                    <h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getTranslateValue(
                            "features-header-3",
                            "<b>Ofis Çözümü<b>"
                          ),
                        }}
                      />
                    </h3>
                    <p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getTranslateValue(
                            "features-content-3",
                            '<br><div style="text-align:justify">İşte Suit içerisindeki Ofis çözümümüz ile; <br>&nbsp;<div style="text-align:justify">- Ofis dokümanı yaratabilir ve düzenleyebilirsiniz.<br>&nbsp;<div style="text-align:justify">- Aynı dosya üzerinde birden fazla kişi ile eş zamanlı çalışabilirsiniz.<br>&nbsp;<div style="text-align:justify">- @bahsetme özelliği ile dosya üzerinde not iletebilirsiniz.<br>&nbsp;<div style="text-align:justify">- Dosya düzenleme sırasında chat özelliği ile iletişim kurabilirsiniz.'
                          ),
                        }}
                      />
                    </p>
                  </div>
                )}
                {item.dataTarget === "4" && (
                  <div>
                    <h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getTranslateValue(
                            "features-header-4",
                            "<b>BiP Meet<b>"
                          ),
                        }}
                      />
                    </h3>
                    <p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getTranslateValue(
                            "features-content-4",
                            '<br><div style="text-align:justify">İşte Suit içerisindeki video konferans çözümümüz ile; <br>&nbsp;<div style="text-align:justify">- Sanal Arka Plan seçimiyle her yerde BiP Meet toplantılarınızı gerçekleştirebilirsiniz.<br>&nbsp;<div style="text-align:justify">- Ara oda oluşturma ile BiP Meet toplantılarınızı farklı çalışma grupları için ayrı odalara bölebilirsiniz.<br>&nbsp;<div style="text-align:justify">- Anket & Oylama özelliği ile toplantılarınızda tekli/çoklu anketler düzenleyebilir ve anket sonuçlarınızı indirebilirsiniz.<br>&nbsp;<div style="text-align:justify">- Tarayıcılardan ya da masaüstü uygulaması üzerinden kullanabilirsiniz.&nbsp;<div style="text-align:justify">'
                          ),
                        }}
                      />
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return <> {renderContent()} </>;
};

interface Props {
  check798px: boolean;
}
