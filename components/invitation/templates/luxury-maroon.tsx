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

export function LuxuryMaroon(props: InvitationTemplateProps) {
  const { invitation, selectedPackage, heroAsset, galleryAssets, videoAsset, musicAsset, display } = props;

  return (
    <main className="min-h-screen scroll-smooth bg-[#330712] text-[#f9df94]">
      <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 py-10 text-center">
        <HeroImage
          asset={heroAsset}
          alt={`Foto ${display.names}`}
          className="absolute inset-0 opacity-18"
          overlayClassName="absolute inset-0 bg-[#330712]/70"
        />
        <div className="absolute inset-5 rounded-[2rem] border border-[#c99b3f]/60" />
        <div className="absolute inset-9 rounded-[1.5rem] border border-[#c99b3f]/25" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#7d1128] to-transparent" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <CoupleMonogram
            initials={display.initials}
            className="mx-auto grid size-24 place-items-center rounded-full border border-[#c99b3f] bg-[#5b1021] font-serif text-2xl"
          />
          <p className="mt-8 text-sm font-black uppercase tracking-[0.24em]">The Wedding of</p>
          <h1 className="mt-5 font-serif text-6xl font-bold leading-[0.95] text-[#f4ce74] sm:text-8xl">
            {invitation.bride_name}
            <span className="block text-[0.52em]">&</span>
            {invitation.groom_name}
          </h1>
          <p className="mx-auto mt-7 max-w-lg text-base leading-7 text-[#ffe9ae]/78">
            Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu.
          </p>
          <div className="mx-auto mt-8 h-px w-64 bg-[#c99b3f]" />
          <p className="mt-7 text-sm font-black uppercase tracking-[0.24em]">{display.eventDay}</p>
          <p className="mt-1 font-serif text-4xl font-bold">{display.eventDateShort}</p>
          <p className="mt-2 text-sm font-bold text-[#ffe9ae]/70">{display.eventTime}</p>
          <CountdownStrip
            items={display.countdown}
            className="mx-auto mt-8 grid max-w-xl grid-cols-4 divide-x divide-[#c99b3f]/40 rounded-2xl border border-[#c99b3f]/50 bg-[#3e0916]/80 px-3 py-5"
            itemClassName="px-2"
          />
          <OpeningButton className="mx-auto mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-[#f6d37a] bg-gradient-to-b from-[#f1c76d] to-[#a86f1d] px-9 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#351008] shadow-[0_18px_40px_rgba(0,0,0,0.35)]" />
        </div>
      </section>
      <section id="invitation-content" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="font-serif text-5xl font-bold leading-tight text-[#f4ce74]">
              Dengan hormat kami mengundang keluarga dan sahabat.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#ffe9ae]/72">
              {invitation.love_story ??
                "Menjadi kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu."}
            </p>
            <MusicPanel
              invitation={invitation}
              musicAsset={musicAsset}
              className="mt-6 flex max-w-md flex-col gap-3 rounded-xl border border-[#c99b3f]/35 bg-[#4a0d1c] px-5 py-3 text-sm font-bold sm:flex-row sm:items-center"
            />
          </div>
          <VideoHighlight videoAsset={videoAsset} className="overflow-hidden rounded-[1.5rem] border border-[#c99b3f]/35 bg-black/20 p-4" />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-4">
        <EventList
          invitation={invitation}
          className="grid gap-5 md:grid-cols-2"
          itemClassName="rounded-[1.5rem] border border-[#c99b3f]/45 bg-[#420916] p-7 text-center shadow-[0_22px_54px_rgba(0,0,0,0.22)]"
          iconClassName="mx-auto size-7 text-[#f4ce74]"
          buttonClassName="mx-auto mt-6 inline-flex items-center gap-2 rounded-xl bg-[#f4ce74] px-5 py-3 text-sm font-black text-[#330712]"
        />
      </section>
      <GallerySection
        assets={galleryAssets}
        videoAsset={null}
        sectionClassName="mx-auto max-w-6xl px-5 py-16"
        titleClassName="text-center font-serif text-5xl font-bold text-[#f4ce74]"
        gridClassName="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        imageClassName="aspect-[4/5] rounded-xl border border-[#c99b3f]/35 object-cover"
      />
      <RsvpGuestbookSection
        invitation={invitation}
        sectionClassName="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-2"
        panelClassName="rounded-[1.5rem] border border-[#c99b3f]/45 bg-[#420916] p-6"
        inputClassName="min-h-12 rounded-xl border border-[#c99b3f]/25 bg-[#fff8e8] px-4 py-3 text-sm font-bold text-[#330712] outline-none"
        buttonClassName="rounded-xl bg-[#f4ce74] px-5 py-3 text-sm font-black text-[#330712]"
        iconClassName="size-6 text-[#f4ce74]"
      />
      <ClosingCredit invitation={invitation} selectedPackage={selectedPackage} className="px-5 pb-12 pt-3 text-center text-[#f4ce74]" />
    </main>
  );
}
