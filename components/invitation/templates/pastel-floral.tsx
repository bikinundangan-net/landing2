import Image from "next/image";
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

export function PastelFloral(props: InvitationTemplateProps) {
  const { invitation, selectedPackage, heroAsset, galleryAssets, videoAsset, musicAsset, display } = props;

  return (
    <main className="min-h-screen scroll-smooth bg-[#fff6fb] text-[#47294e]">
      <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 py-10 text-center">
        <HeroImage
          asset={heroAsset}
          alt={`Foto ${display.names}`}
          className="absolute inset-0 opacity-18"
          overlayClassName="absolute inset-0 bg-[#fff6fb]/58"
        />
        <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-[#ffd1c5]/70 blur-3xl" />
        <div className="absolute -right-16 bottom-20 h-80 w-80 rounded-full bg-[#d8c1f0]/70 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-xl">
          <CoupleMonogram
            initials={display.initials}
            className="mx-auto grid size-20 place-items-center rounded-full border border-[#e2b56a]/60 bg-white/70 font-serif text-xl"
          />
          <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#9d7ac2]">The Wedding of</p>
          <h1 className="mt-5 font-serif text-6xl font-bold leading-tight sm:text-8xl">
            {invitation.bride_name}
            <span className="block text-[0.5em] text-[#ee6e6f]">&</span>
            {invitation.groom_name}
          </h1>
          <div className="mx-auto mt-6 h-px w-48 bg-[#ee6e6f]" />
          <p className="mt-7 text-sm font-black uppercase tracking-[0.2em]">{display.eventDay}</p>
          <p className="font-serif text-4xl font-bold text-[#ee6e6f]">{display.eventDateShort}</p>
          <p className="mt-3 text-sm font-bold opacity-72">{display.location}</p>
          {galleryAssets.length > 0 ? (
            <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 rounded-[2rem] border border-white/80 bg-white/45 p-3 backdrop-blur-sm">
              {galleryAssets.slice(0, 3).map((asset) => (
                <Image
                  key={asset.public_url}
                  src={asset.public_url}
                  alt=""
                  width={220}
                  height={220}
                  className="aspect-square rounded-2xl object-cover"
                  sizes="120px"
                />
              ))}
            </div>
          ) : null}
          <OpeningButton className="mx-auto mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#ee6e6f] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(238,110,111,0.22)]" />
        </div>
      </section>
      <section id="invitation-content" className="mx-auto max-w-6xl px-5 py-20 text-center">
        <h2 className="font-serif text-5xl font-bold">Dengan penuh cinta</h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 opacity-72">
          {invitation.love_story ??
            "Kami mengundang keluarga dan sahabat untuk hadir dan menjadi bagian dari hari bahagia kami."}
        </p>
        <MusicPanel
          invitation={invitation}
          musicAsset={musicAsset}
          className="mx-auto mt-6 inline-flex max-w-md flex-col gap-3 rounded-full border border-[#9d7ac2]/18 bg-white/70 px-5 py-3 text-sm font-bold sm:flex-row sm:items-center"
        />
      </section>
      <section className="mx-auto max-w-6xl px-5 py-4">
        <EventList
          invitation={invitation}
          className="grid gap-5 md:grid-cols-2"
          itemClassName="rounded-[2rem] border border-white/80 bg-white/65 p-7 text-center shadow-[0_18px_44px_rgba(71,41,78,0.10)]"
          iconClassName="mx-auto size-7 text-[#ee6e6f]"
          buttonClassName="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#9d7ac2] px-5 py-3 text-sm font-black text-white"
        />
      </section>
      <GallerySection
        assets={galleryAssets}
        videoAsset={videoAsset}
        sectionClassName="mx-auto max-w-6xl px-5 py-16"
        titleClassName="text-center font-serif text-5xl font-bold"
        gridClassName="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        imageClassName="aspect-square rounded-[2rem] border-4 border-white object-cover shadow-[0_18px_44px_rgba(71,41,78,0.12)]"
      />
      <RsvpGuestbookSection
        invitation={invitation}
        sectionClassName="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-2"
        panelClassName="rounded-[2rem] border border-white/80 bg-white/68 p-6 shadow-[0_18px_44px_rgba(71,41,78,0.10)]"
        inputClassName="min-h-12 rounded-2xl border border-[#9d7ac2]/14 bg-white px-4 py-3 text-sm font-bold outline-none"
        buttonClassName="rounded-2xl bg-[#ee6e6f] px-5 py-3 text-sm font-black text-white"
        iconClassName="size-6 text-[#9d7ac2]"
      />
      <ClosingCredit invitation={invitation} selectedPackage={selectedPackage} className="px-5 pb-12 pt-3 text-center" />
    </main>
  );
}
