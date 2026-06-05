<script lang="ts">
  import AnnounceCard from "$lib/components/AnnounceCard/AnnounceCard.svelte"
  import LinkIcon from "$lib/icons/Link.svelte"
  import UserStar from "$lib/icons/UserStar.svelte"
  import Clock from "$lib/icons/Clock.svelte"
  import Banknote from "$lib/icons/Banknote.svelte"
  import BandBadge from "$lib/components/BandBadge/BandBadge.svelte"

  const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
  })

  let {
    data
  } = $props()
</script>

<AnnounceCard {...data.event} announcePage={true} loading="eager"/>

<div class="header">
  <div class="page-container header-row">
    <div>
      <h1>Волна рока</h1>
      <address>
        <a href="">
          <LinkIcon />
          <span>Шхеры, ул. Книповича 46</span>
        </a>
      </address>
      <div class="tags">
        <div>
          <UserStar />
          <span>24 чел</span>
        </div>
        <div>
          <Clock />
          <span>3 ч</span>
        </div>
        <div>
          <Banknote />
          <span>300 руб</span>
        </div>
      </div>
    </div>

    <div>
      <time datetime={data.event.date.toISOString()}>{dateFormatter.format(data.event.date)}</time>
      <div class="type">Концерт</div>
    </div>
  </div>
</div>

<div class="page-container users_data">
  <h2>Описание</h2>
  <p>ПРОКАТИМСЯ НА ВОЛНЕ РОКА? ПРЫГАЙТЕ В МУЗЫКАЛЬНОЕ МОРЕ НОВОЙ ЛОКАЛЬНОЙ РОК-СЦЕНЫ, КРАУДСЁРФИНГ ПРИВЕТСТВУЕТСЯ!</p>

  <h2>Группы</h2>
  <div class="band-badge">
    <BandBadge slug="" miniImg="/test-data/band-badge.png"  name="98 ДО СПУТНИКА" genres={[{id: 0, name: 'Метал'}, {id: 1, name: 'Рок'}]}/>
  </div>
  <p>САМОБЫТНАЯ И ПО-ХОРОШЕМУ БЕШЕНАЯ ПАНК ФОРМАЦИЯ ВОЗВРАЩАЕТСЯ К НАМ В ЭТОМ ГОДУ - В ОБНОВЛЕННОМ СОСТАВЕ, НО С ТОЙ ЖЕ ЭНЕРГИЕЙ!</p>

  <hr>

  <div class="band-badge">
    <BandBadge slug="" miniImg="/test-data/band-badge.png"  name="SKIT" genres={[{id: 0, name: 'Метал'}, {id: 1, name: 'Рок'}]}/>
  </div>
  <p>МОЛОДОЙ КОЛЛЕКТИВ, ИСПОЛНЯЮЩИЙ ЭМОЦИОНАЛЬНЫЙ АЛЬТ МЕТАЛЛ, ПРЕДСТАВИТ ВАШЕМУ ВНИМАНИЮ НОВЫЙ СОСТАВ И ОБНОВЛЕННУЮ ПРОГРАММУ. В ТВОРЧЕСТВЕ РЕБЯТ ДОСТОЧНО КАЧЁВЫХ ЧАСТЕЙ ДЛЯ НЕПЛОХОГО МОША, А СЕНТИМЕНТАЛЬНЫЕ МОМЕНТЫ ДОЛЖНЫ ВЗЯТЬ ЗА ДУШУ САМЫХ ЧЕРСТВЫХ ЭМО-РОКЕРОВ!</p>

  <hr>

  <div class="band-badge">
    <BandBadge slug="" miniImg="/test-data/band-badge.png"  name="ПРИЦЕЛ" genres={[{id: 5, name: 'Альтернатива'}]}/>
  </div>
  <p>САМЫЕ ЮНЫЕ, НО УЖЕ ХОРОШО ВАМ ЗНАКОМЫЕ АЛЬТЕРНАТИВНЫЕ РОКЕРЫ, КАЧЕСТВЕННО И ИНТЕРЕСНО ИСПОЛНЯЮТ СОБСТВЕННЫЕ ПЕСНИ. ЕСЛИ ВАМ ПОНРАВИЛАСЬ ИХ МУЗЫКА ВОЗЛЕ ДЕТСКОГО МИРА, ТО НА КОНЦЕРТЕ ТОЧНО ПОНРАВИТСЯ ЕЩЕ БОЛЬШЕ!</p>

  <hr>

  <div class="band-badge">
    <BandBadge slug="" miniImg="/test-data/band-badge.png"  name="Бесконечная тень" genres={[{id: 5, name: 'Русский рок'}]}/>
  </div>
  <p>СОЛЬНЫЙ ПРОЕКТ НА ГРАНИ РУССКОГО РОКА И СИБПАНКА ПРЕВРАТИЛСЯ В ПОЛНОЦЕННЫЙ КОЛЛЕКТИВ ОПЫТНЫХ МУЗЫКАНТОВ. УЗНАВАЕМЫЙ ВОКАЛ И ЯРКАЯ АВТОРСКАЯ ЛИРИКА - ТЕПЕРЬ В СОПРОВОЖДЕНИИ ДОСТОЙНОГО ИНСТРУМЕНТАЛА!</p>
</div>

<div class="page-container">
  <button class="join">Я пойду</button>
</div>

<style lang="scss">
  @use "$lib/scss/mixins/bg";

  .join {
    width: 100%;
    padding: 8px 20px;

    margin-top: 20px;

    outline: none;
    background-color: var(--color-accent);
    border-radius: 6px;
    border: none;

    color: #FFF;
    font: inherit;
    font-size: 1rem;
    font-weight: 600;
  }
  .users_data :global {
    h2 {
      margin: 16px 0 8px 0;
    }
    p {
      font-weight: 300;
      margin: 8px 0;
    }

    h2 ~ .band-badge,
    h2 ~ hr,
    h2 ~ p {
      margin-left: 20px;
    }

    hr {
      width: 100px;
      opacity: 0.3;
      margin-top: 12px;
      margin-bottom: 12px;
    }

    .divider {

    }
  }
  h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  address {
    font-style: normal;
    font-weight: 400;
  }

  .header {
    @include bg.section-start;
    padding: 12px 0;

    time {
      font-weight: 500;
    }

    .tags {
      display: flex;
      gap: 12px;
      margin-top: 8px;
      font-weight: 500;
      font-size: .75rem;
      align-items: center;

      > div {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
    .type {
      color: var(--color-accent);
    }
  }

  .header-row {
    display: flex;
    justify-content: space-between;

    > div:last-child {
      text-align: right;
    }
  }

</style>