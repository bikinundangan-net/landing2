import type { InvitationTemplateProps } from "@/components/invitation/templates/shared";
import {
  ClosingCredit,
  CoupleMonogram,
  EventList,
  GallerySection,
  HeroImage,
  MusicPanel,
  OpeningButton,
  RsvpGuestbookSection,
} from "@/components/invitation/templates/shared";

export function ModernMinimal(props: InvitationTemplateProps) {
  const { invitation, selectedPackage, heroAsset, galleryAssets, videoAsset, musicAsset, display } = props;

  return (
    <main className="min-h-screen scroll-smooth bg-[#fbfaf7] text-[#151311]">
      <section className="grid min-h-[100svh] items-center px-5 py-12">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <CoupleMonogram
              initials={display.initials.replace(" | ", "")}
              className="grid size-24 place-items-center rounded-full border border-[#b8a488] font-serif text-2xl"
            />
            <p className="mt-12 text-sm font-black uppercase tracking-[0.34em]">The Wedding of</p>
            <h1 className="mt-8 font-serif text-7xl font-medium uppercase leading-[0.86] tracking-normal sm:text-8xl lg:text-9xl">
              {invitation.bride_name}
              <span className="block py-2 text-[0.46em] text-[#a89578]">&</span>
              {invitation.groom_name}
            </h1>
            <div className="mt-10 flex max-w-xl items-center gap-5 border-y border-[#151311]/18 py-6">
              <p className="font-serif text-4xl">{display.eventDateShort}</p>
              <div className="h-16 w-px bg-[#151311]/20" />
              <p className="text-sm font-semibold leading-6 opacity-72">
                {display.eventTime}
                <span className="block">{display.location}</span>
              </p>
            </div>
            <OpeningButton className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-[#151311] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white" />
          </div>
          <div className="relative min-h-[35rem] overflow-hidden border border-[#151311]/12 bg-[#f1eee8]">
            <HeroImage
              asset={heroAsset}
              alt={`Foto ${display.names}`}
              className="absolute inset-0 opacity-80"
              overlayClassName="absolute inset-0 bg-gradient-to-t from-[#fbfaf7] via-transparent to-transparent"
            />
            {!heroAsset ? (
              <div className="absolute inset-10 grid place-items-center border border-[#151311]/10">
                <p className="font-serif text-8xl text-[#151311]/16">{display.initials}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="invitation-content" className="mx-auto max-w-6xl border-t border-[#151311]/15 px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] opacity-58">Cerita Kami</p>
            <MusicPanel
              invitation={invitation}
              musicAsset={musicAsset}
              className="mt-6 flex max-w-sm flex-col gap-3 border border-[#151311]/12 bg-white px-4 py-3 text-sm font-bold"
            />
          </div>
          <p className="font-serif text-3xl leading-snug text-[#151311]/78 sm:text-4xl">
            {invitation.love_story ??
              "Di antara langkah-langkah kecil, kami menemukan rumah. Dengan hati yang penuh syukur, kami mengundang keluarga dan sahabat untuk hadir."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-6">
        <EventList
          invitation={invitation}
          className="grid gap-px overflow-hidden border border-[#151311]/12 bg-[#151311]/12 md:grid-cols-2"
          itemClassName="bg-[#fbfaf7] p-8"
          iconClassName="size-6 text-[#151311]"
          buttonClassName="mt-6 inline-flex items-center gap-2 border border-[#151311] px-5 py-3 text-sm font-black uppercase tracking-[0.12em]"
        />
      </section>
      <GallerySection
        assets={galleryAssets}
        videoAsset={videoAsset}
        sectionClassName="mx-auto max-w-6xl px-5 py-16"
        titleClassName="border-b border-[#151311]/12 pb-4 font-serif text-5xl font-medium"
        gridClassName="mt-8 grid gap-px bg-[#151311]/12 sm:grid-cols-2 lg:grid-cols-4"
        imageClassName="aspect-[4/5] bg-[#fbfaf7] object-cover"
      />
      <RsvpGuestbookSection
        invitation={invitation}
        sectionClassName="mx-auto grid max-w-6xl gap-px bg-[#151311]/12 px-5 py-16 lg:grid-cols-2"
        panelClassName="bg-[#fbfaf7] p-7"
        inputClassName="min-h-12 border border-[#151311]/12 bg-white px-4 py-3 text-sm font-bold outline-none"
        buttonClassName="bg-[#151311] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white"
        iconClassName="size-6 text-[#151311]"
      />
      <ClosingCredit
        invitation={invitation}
        selectedPackage={selectedPackage}
        className="border-t border-[#151311]/12 px-5 py-12 text-center"
      />
    </main>
  );
}
