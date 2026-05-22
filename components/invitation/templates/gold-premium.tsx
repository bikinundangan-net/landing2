import type { InvitationTemplateProps } from "@/components/invitation/templates/shared";
import {
  ClosingCredit,
  CountdownStrip,
  CoupleMonogram,
  EventList,
  GallerySection,
  HeroImage,
  MusicPanel,
  OpeningButton,
  RsvpGuestbookSection,
  VideoHighlight,
} from "@/components/invitation/templates/shared";

export function GoldPremium(props: InvitationTemplateProps) {
  const { invitation, selectedPackage, heroAsset, galleryAssets, videoAsset, musicAsset, display } = props;

  return (
    <main className="min-h-screen scroll-smooth bg-[#050505] text-[#f7dda1]">
      <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 py-10 text-center">
        <HeroImage
          asset={heroAsset}
          alt={`Foto ${display.names}`}
          className="absolute inset-0 opacity-15"
          overlayClassName="absolute inset-0 bg-[#050505]/76"
        />
        <div className="absolute inset-4 rounded-[2rem] border border-[#c59b4a]/70" />
        <div className="absolute inset-8 rounded-t-[8rem] border border-[#c59b4a]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,155,74,0.25),transparent_28rem)]" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <CoupleMonogram
            initials={display.initials}
            className="mx-auto grid size-24 place-items-center rounded-full border border-[#c59b4a] bg-[#111] font-serif text-2xl text-[#f7dda1]"
          />
          <p className="mt-8 text-sm font-black uppercase tracking-[0.24em]">The Wedding of</p>
          <h1 className="mt-5 font-serif text-6xl font-bold leading-[0.95] text-[#f3c969] sm:text-8xl">
            {invitation.bride_name}
            <span className="block text-[0.52em]">&</span>
            {invitation.groom_name}
          </h1>
          <div className="mx-auto mt-7 h-px w-64 bg-[#c59b4a]" />
          <p className="mx-auto mt-7 max-w-lg text-base leading-7 text-[#f7dda1]/76">
            Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu.
          </p>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.24em]">{display.eventDay}</p>
          <p className="font-serif text-4xl font-bold">{display.eventDateShort}</p>
          <p className="mt-2 text-sm font-bold text-[#f7dda1]/70">{display.location}</p>
          <CountdownStrip
            items={display.countdown}
            className="mx-auto mt-8 grid max-w-xl grid-cols-4 divide-x divide-[#c59b4a]/35 rounded-xl border border-[#c59b4a]/60 bg-[#111]/85 px-3 py-5"
            itemClassName="px-2"
          />
          <OpeningButton className="mx-auto mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-[#f3c969] bg-gradient-to-b from-[#f3c969] to-[#a67626] px-9 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#080808] shadow-[0_18px_40px_rgba(0,0,0,0.45)]" />
        </div>
      </section>
      <section id="invitation-content" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="font-serif text-5xl font-bold leading-tight text-[#f3c969]">
              Undangan elegan untuk malam yang tak terlupakan.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#f7dda1]/72">
              {invitation.love_story ??
                "Dengan segala kerendahan hati, kami mengundang keluarga dan sahabat untuk hadir serta memberikan doa restu."}
            </p>
            <MusicPanel
              invitation={invitation}
              musicAsset={musicAsset}
              className="mt-6 flex max-w-md flex-col gap-3 rounded-xl border border-[#c59b4a]/35 bg-[#111] px-5 py-3 text-sm font-bold sm:flex-row sm:items-center"
            />
          </div>
          <VideoHighlight videoAsset={videoAsset} className="overflow-hidden rounded-[1.5rem] border border-[#c59b4a]/35 bg-[#111] p-4" />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-4">
        <EventList
          invitation={invitation}
          className="grid gap-5 md:grid-cols-2"
          itemClassName="rounded-[1.5rem] border border-[#c59b4a]/45 bg-[#111] p-7 text-center"
          iconClassName="mx-auto size-7 text-[#f3c969]"
          buttonClassName="mx-auto mt-6 inline-flex items-center gap-2 rounded-xl bg-[#f3c969] px-5 py-3 text-sm font-black text-[#050505]"
        />
      </section>
      <GallerySection
        assets={galleryAssets}
        videoAsset={null}
        sectionClassName="mx-auto max-w-6xl px-5 py-16"
        titleClassName="text-center font-serif text-5xl font-bold text-[#f3c969]"
        gridClassName="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        imageClassName="aspect-[4/5] rounded-xl border border-[#c59b4a]/35 object-cover"
      />
      <RsvpGuestbookSection
        invitation={invitation}
        sectionClassName="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-2"
        panelClassName="rounded-[1.5rem] border border-[#c59b4a]/45 bg-[#111] p-6"
        inputClassName="min-h-12 rounded-xl border border-[#c59b4a]/25 bg-[#fff8e8] px-4 py-3 text-sm font-bold text-[#050505] outline-none"
        buttonClassName="rounded-xl bg-[#f3c969] px-5 py-3 text-sm font-black text-[#050505]"
        iconClassName="size-6 text-[#f3c969]"
      />
      <ClosingCredit invitation={invitation} selectedPackage={selectedPackage} className="px-5 pb-12 pt-3 text-center text-[#f3c969]" />
    </main>
  );
}
