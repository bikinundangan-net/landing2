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

export function RusticCream(props: InvitationTemplateProps) {
  const { invitation, selectedPackage, heroAsset, galleryAssets, videoAsset, musicAsset, display } = props;

  return (
    <main className="min-h-screen scroll-smooth bg-[#fff4e3] text-[#553224]">
      <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 py-10 text-center">
        <HeroImage
          asset={heroAsset}
          alt={`Foto ${display.names}`}
          className="absolute inset-0 opacity-20"
          overlayClassName="absolute inset-0 bg-[#fff4e3]/55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(85,50,36,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(85,50,36,0.06)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="relative z-10 mx-auto max-w-2xl border-y border-[#c56a48]/35 bg-[#fff8ed]/72 px-6 py-10 shadow-[0_28px_70px_rgba(85,50,36,0.12)] backdrop-blur-sm">
          <CoupleMonogram
            initials={display.initials}
            className="mx-auto grid size-20 place-items-center rounded-full border border-[#a67945] font-serif text-xl"
          />
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em]">The Wedding of</p>
          <h1 className="mt-5 font-serif text-6xl font-bold leading-tight text-[#c56a48] sm:text-8xl">
            {invitation.bride_name}
            <span className="block text-[0.5em] text-[#553224]">&</span>
            {invitation.groom_name}
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-7">
            Dengan penuh cinta, kami mengundang Anda untuk merayakan hari istimewa kami.
          </p>
          <div className="mx-auto my-8 h-px w-64 bg-[#c56a48]/45" />
          <p className="text-sm font-black uppercase tracking-[0.2em]">{display.eventDay}</p>
          <p className="font-serif text-4xl font-bold">{display.eventDateShort}</p>
          <p className="mt-2 text-sm font-bold opacity-75">{display.location}</p>
          <OpeningButton className="mx-auto mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#c56a48] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(197,106,72,0.24)]" />
        </div>
      </section>
      <section id="invitation-content" className="mx-auto grid max-w-6xl gap-8 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="border-y border-[#c56a48]/30 py-7">
          <h2 className="font-serif text-5xl font-bold">Lokasi dan cerita</h2>
          <p className="mt-5 text-lg leading-8 opacity-74">
            {invitation.love_story ??
              "Semoga langkah ini menjadi awal perjalanan yang penuh kasih, doa, dan kebersamaan."}
          </p>
          <MusicPanel
            invitation={invitation}
            musicAsset={musicAsset}
            className="mt-6 flex max-w-md flex-col gap-3 rounded-2xl border border-[#c56a48]/20 bg-white/60 px-5 py-3 text-sm font-bold sm:flex-row sm:items-center"
          />
        </div>
        <EventList
          invitation={invitation}
          className="grid gap-4"
          itemClassName="rounded-[1.5rem] border border-[#c56a48]/20 bg-[#fff8ed] p-6 shadow-[0_18px_44px_rgba(85,50,36,0.08)]"
          iconClassName="size-6 text-[#c56a48]"
          buttonClassName="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#c56a48] px-5 py-3 text-sm font-black text-white"
        />
      </section>
      <GallerySection
        assets={galleryAssets}
        videoAsset={videoAsset}
        sectionClassName="mx-auto max-w-6xl px-5 py-16"
        titleClassName="text-center font-serif text-5xl font-bold"
        gridClassName="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        imageClassName="aspect-[4/3] rounded-[1.5rem] border-4 border-[#fff8ed] object-cover shadow-[0_18px_44px_rgba(85,50,36,0.14)]"
      />
      <RsvpGuestbookSection
        invitation={invitation}
        sectionClassName="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-2"
        panelClassName="rounded-[1.5rem] border border-[#c56a48]/20 bg-[#fff8ed] p-6 shadow-[0_18px_44px_rgba(85,50,36,0.08)]"
        inputClassName="min-h-12 rounded-xl border border-[#c56a48]/18 bg-white px-4 py-3 text-sm font-bold outline-none"
        buttonClassName="rounded-xl bg-[#c56a48] px-5 py-3 text-sm font-black text-white"
        iconClassName="size-6 text-[#c56a48]"
      />
      <ClosingCredit invitation={invitation} selectedPackage={selectedPackage} className="px-5 pb-12 pt-3 text-center" />
    </main>
  );
}
