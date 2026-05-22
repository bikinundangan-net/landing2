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
  TemplatePreviewImage,
} from "@/components/invitation/templates/shared";

export function ClassicRose(props: InvitationTemplateProps) {
  const { invitation, template, selectedPackage, heroAsset, galleryAssets, videoAsset, musicAsset, display } = props;

  return (
    <main className="min-h-screen scroll-smooth bg-[#fff7f4] text-[#4b0f1a]">
      <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 py-14 text-center">
        <HeroImage
          asset={heroAsset}
          alt={`Foto ${display.names}`}
          className="absolute inset-0 opacity-20"
          overlayClassName="absolute inset-0 bg-[#fff7f4]/35"
        />
        <div className="absolute -top-16 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[#f6ccd4] blur-3xl" />
        <div className="absolute left-4 top-8 h-44 w-32 rounded-full border border-[#bf6d70]/30" />
        <div className="absolute bottom-8 right-4 h-48 w-32 rounded-full border border-[#bf6d70]/30" />
        <div className="relative z-10 mx-auto max-w-[42rem] rounded-[999px] border border-[#cfa67e]/50 bg-[#fffaf7]/78 px-6 py-12 shadow-[0_30px_80px_rgba(118,36,51,0.12)] backdrop-blur-sm sm:px-12">
          <CoupleMonogram
            initials={display.initials}
            className="mx-auto grid size-20 place-items-center rounded-full border border-[#b78a49]/50 font-serif text-xl text-[#8f2d3a]"
          />
          <p className="mt-8 text-sm font-black uppercase tracking-[0.26em] text-[#8f2d3a]">
            The Wedding of
          </p>
          <h1 className="mt-5 font-serif text-6xl font-bold leading-[0.92] sm:text-8xl">
            {invitation.bride_name}
            <span className="block text-[0.55em] text-[#b78a49]">&</span>
            {invitation.groom_name}
          </h1>
          <div className="mx-auto mt-8 h-px w-52 bg-[#b78a49]" />
          <p className="mt-7 text-sm font-black uppercase tracking-[0.22em]">
            {display.eventDay}
          </p>
          <p className="mt-2 font-serif text-4xl font-bold text-[#8f2d3a]">
            {display.eventDateShort}
          </p>
          <p className="mt-2 text-sm font-bold opacity-70">{display.eventTime}</p>
          <p className="mx-auto mt-5 max-w-sm text-sm font-semibold leading-6 opacity-72">
            {display.location}
          </p>
          <OpeningButton className="mx-auto mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#9d2b3f] px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_34px_rgba(157,43,63,0.28)]" />
        </div>
      </section>

      <section id="invitation-content" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1fr_0.7fr] lg:items-center">
        <div>
          <p className="font-serif text-2xl italic text-[#b66f78]">Dengan penuh cinta</p>
          <h2 className="mt-4 font-serif text-5xl font-bold leading-tight">
            Kami mengundang Anda untuk merayakan hari istimewa kami.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 opacity-72">
            {invitation.love_story ??
              "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu."}
          </p>
          <MusicPanel
            invitation={invitation}
            musicAsset={musicAsset}
            className="mt-6 inline-flex max-w-md flex-col gap-3 rounded-full border border-[#9d2b3f]/15 bg-white/68 px-5 py-3 text-sm font-bold sm:flex-row sm:items-center"
          />
        </div>
        <div className="relative mx-auto w-full max-w-xs">
          <div className="absolute inset-8 rounded-full bg-[#f6ccd4] blur-3xl" />
          <TemplatePreviewImage
            template={template}
            className="relative mx-auto h-[34rem] w-auto object-contain drop-shadow-[0_26px_44px_rgba(75,15,26,0.22)]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <EventList
          invitation={invitation}
          className="grid gap-5 md:grid-cols-2"
          itemClassName="rounded-[2rem] border border-[#9d2b3f]/12 bg-white/72 p-7 shadow-[0_22px_54px_rgba(75,15,26,0.08)]"
          iconClassName="size-7 text-[#9d2b3f]"
          buttonClassName="mt-6 inline-flex items-center gap-2 rounded-full bg-[#9d2b3f] px-5 py-3 text-sm font-black text-white"
        />
      </section>

      <GallerySection
        assets={galleryAssets}
        videoAsset={videoAsset}
        sectionClassName="mx-auto max-w-6xl px-5 py-16"
        titleClassName="text-center font-serif text-5xl font-bold"
        gridClassName="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        imageClassName="aspect-[4/5] rounded-[2rem] object-cover shadow-[0_18px_44px_rgba(75,15,26,0.13)]"
      />
      <RsvpGuestbookSection
        invitation={invitation}
        sectionClassName="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-2"
        panelClassName="rounded-[2rem] border border-[#9d2b3f]/12 bg-white/78 p-6 shadow-[0_22px_54px_rgba(75,15,26,0.08)]"
        inputClassName="min-h-12 rounded-2xl border border-[#9d2b3f]/12 bg-white px-4 py-3 text-sm font-bold outline-none"
        buttonClassName="rounded-2xl bg-[#9d2b3f] px-5 py-3 text-sm font-black text-white"
        iconClassName="size-6 text-[#9d2b3f]"
      />
      <ClosingCredit
        invitation={invitation}
        selectedPackage={selectedPackage}
        className="px-5 pb-12 pt-3 text-center"
      />
    </main>
  );
}
