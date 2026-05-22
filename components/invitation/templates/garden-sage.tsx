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

export function GardenSage(props: InvitationTemplateProps) {
  const { invitation, selectedPackage, heroAsset, galleryAssets, videoAsset, musicAsset, display } = props;

  return (
    <main className="min-h-screen scroll-smooth bg-[#f5f8ee] text-[#2f3d2b]">
      <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 py-10 text-center">
        <HeroImage
          asset={heroAsset}
          alt={`Foto ${display.names}`}
          className="absolute inset-0 opacity-16"
          overlayClassName="absolute inset-0 bg-[#f5f8ee]/55"
        />
        <div className="absolute inset-x-4 top-6 h-[calc(100%-3rem)] rounded-[3rem] border border-[#c8a354]/45" />
        <div className="absolute -left-10 top-16 h-80 w-48 rounded-full border border-[#6f8266]/25 bg-[#dbe8d0]/50 blur-sm" />
        <div className="absolute -right-10 bottom-20 h-80 w-48 rounded-full border border-[#6f8266]/25 bg-[#dbe8d0]/50 blur-sm" />
        <div className="relative z-10 mx-auto max-w-xl">
          <CoupleMonogram
            initials={display.initials}
            className="mx-auto grid size-20 place-items-center rounded-full border border-[#c8a354]/70 bg-[#fffdf7] font-serif text-xl"
          />
          <p className="mt-8 text-sm font-black uppercase tracking-[0.24em]">The Wedding of</p>
          <h1 className="mt-5 font-serif text-6xl font-bold leading-tight text-[#34462f] sm:text-8xl">
            {invitation.bride_name}
            <span className="block text-[0.48em] text-[#84935c]">&</span>
            {invitation.groom_name}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 opacity-74">
            Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu.
          </p>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.2em]">{display.eventDay}</p>
          <p className="font-serif text-4xl font-bold">{display.eventDateShort}</p>
          <p className="mt-2 text-sm font-bold opacity-70">{display.location}</p>
          <OpeningButton className="mx-auto mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-[#c8a354] bg-[#34462f] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(47,61,43,0.22)]" />
        </div>
      </section>

      <section id="invitation-content" className="mx-auto max-w-6xl px-5 py-20">
        <div className="rounded-[2rem] border border-[#c8a354]/35 bg-[#fffdf7]/78 p-7 text-center shadow-[0_24px_60px_rgba(47,61,43,0.10)]">
          <h2 className="font-serif text-5xl font-bold">Konfirmasi Hari Bahagia</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 opacity-72">
            {invitation.love_story ??
              "Dengan rahmat Allah SWT, kami memohon doa restu dan kehadiran Bapak/Ibu/Saudara/i pada acara pernikahan kami."}
          </p>
          <MusicPanel
            invitation={invitation}
            musicAsset={musicAsset}
            className="mx-auto mt-6 inline-flex max-w-md flex-col gap-3 rounded-full border border-[#6f8266]/18 bg-white px-5 py-3 text-sm font-bold sm:flex-row sm:items-center"
          />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-4">
        <EventList
          invitation={invitation}
          className="grid gap-5 md:grid-cols-2"
          itemClassName="rounded-[2rem] border border-[#c8a354]/30 bg-[#fffdf7] p-7 text-center shadow-[0_18px_50px_rgba(47,61,43,0.08)]"
          iconClassName="mx-auto size-7 text-[#6f8266]"
          buttonClassName="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#6f8266] px-5 py-3 text-sm font-black text-white"
        />
      </section>
      <GallerySection
        assets={galleryAssets}
        videoAsset={videoAsset}
        sectionClassName="mx-auto max-w-6xl px-5 py-16"
        titleClassName="text-center font-serif text-5xl font-bold"
        gridClassName="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        imageClassName="aspect-[5/4] rounded-[2rem] border border-[#c8a354]/25 object-cover shadow-[0_18px_42px_rgba(47,61,43,0.12)]"
      />
      <RsvpGuestbookSection
        invitation={invitation}
        sectionClassName="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-2"
        panelClassName="rounded-[2rem] border border-[#c8a354]/30 bg-[#fffdf7] p-6 shadow-[0_18px_50px_rgba(47,61,43,0.08)]"
        inputClassName="min-h-12 rounded-full border border-[#6f8266]/14 bg-white px-4 py-3 text-sm font-bold outline-none"
        buttonClassName="rounded-full bg-[#34462f] px-5 py-3 text-sm font-black text-white"
        iconClassName="size-6 text-[#6f8266]"
      />
      <ClosingCredit invitation={invitation} selectedPackage={selectedPackage} className="px-5 pb-12 pt-3 text-center" />
    </main>
  );
}
