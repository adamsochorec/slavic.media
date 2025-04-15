
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'ArticleMetadata': typeof import("../components/ArticleMetadata.vue")['default']
    'BlogCard': typeof import("../components/BlogCard.vue")['default']
    'Clients': typeof import("../components/Clients.vue")['default']
    'ColourGrading': typeof import("../components/ColourGrading.vue")['default']
    'CompanyTimeline': typeof import("../components/CompanyTimeline.vue")['default']
    'Cookies': typeof import("../components/Cookies.vue")['default']
    'Employees': typeof import("../components/Employees.vue")['default']
    'Footer': typeof import("../components/Footer.vue")['default']
    'FurtherReading': typeof import("../components/FurtherReading.vue")['default']
    'FurtherServices': typeof import("../components/FurtherServices.vue")['default']
    'GalleryItem': typeof import("../components/GalleryItem.vue")['default']
    'HeroVideo': typeof import("../components/HeroVideo.vue")['default']
    'Img': typeof import("../components/Img.vue")['default']
    'LatestArticle': typeof import("../components/LatestArticle.vue")['default']
    'LightroomPresets': typeof import("../components/LightroomPresets.vue")['default']
    'Map': typeof import("../components/Map.vue")['default']
    'NavBar': typeof import("../components/NavBar.vue")['default']
    'Reels': typeof import("../components/Reels.vue")['default']
    'RequestProposal': typeof import("../components/RequestProposal.vue")['default']
    'Reviews': typeof import("../components/Reviews.vue")['default']
    'Services': typeof import("../components/Services.vue")['default']
    'SkeletonArticle': typeof import("../components/SkeletonArticle.vue")['default']
    'SkeletonGalleryItem': typeof import("../components/SkeletonGalleryItem.vue")['default']
    'SkeletonLatestArticle': typeof import("../components/SkeletonLatestArticle.vue")['default']
    'SkeletonServices': typeof import("../components/SkeletonServices.vue")['default']
    'SkeletonSwiper': typeof import("../components/SkeletonSwiper.vue")['default']
    'SocialIcon': typeof import("../components/SocialIcon.vue")['default']
    'SoundEdit': typeof import("../components/SoundEdit.vue")['default']
    'SwiperFurtherServices': typeof import("../components/SwiperFurtherServices.vue")['default']
    'VideoItem': typeof import("../components/VideoItem.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'AutoComplete': typeof import("primevue/autocomplete")['default']
    'Calendar': typeof import("primevue/calendar")['default']
    'CascadeSelect': typeof import("primevue/cascadeselect")['default']
    'Checkbox': typeof import("primevue/checkbox")['default']
    'CheckboxGroup': typeof import("primevue/checkboxgroup")['default']
    'Chips': typeof import("primevue/chips")['default']
    'ColorPicker': typeof import("primevue/colorpicker")['default']
    'DatePicker': typeof import("primevue/datepicker")['default']
    'Dropdown': typeof import("primevue/dropdown")['default']
    'FloatLabel': typeof import("primevue/floatlabel")['default']
    'Fluid': typeof import("primevue/fluid")['default']
    'IconField': typeof import("primevue/iconfield")['default']
    'IftaLabel': typeof import("primevue/iftalabel")['default']
    'InputChips': typeof import("primevue/inputchips")['default']
    'InputGroup': typeof import("primevue/inputgroup")['default']
    'InputGroupAddon': typeof import("primevue/inputgroupaddon")['default']
    'InputIcon': typeof import("primevue/inputicon")['default']
    'InputMask': typeof import("primevue/inputmask")['default']
    'InputNumber': typeof import("primevue/inputnumber")['default']
    'InputOtp': typeof import("primevue/inputotp")['default']
    'InputSwitch': typeof import("primevue/inputswitch")['default']
    'InputText': typeof import("primevue/inputtext")['default']
    'Knob': typeof import("primevue/knob")['default']
    'Listbox': typeof import("primevue/listbox")['default']
    'MultiSelect': typeof import("primevue/multiselect")['default']
    'Password': typeof import("primevue/password")['default']
    'RadioButton': typeof import("primevue/radiobutton")['default']
    'RadioButtonGroup': typeof import("primevue/radiobuttongroup")['default']
    'Rating': typeof import("primevue/rating")['default']
    'Select': typeof import("primevue/select")['default']
    'SelectButton': typeof import("primevue/selectbutton")['default']
    'Slider': typeof import("primevue/slider")['default']
    'Textarea': typeof import("primevue/textarea")['default']
    'ToggleButton': typeof import("primevue/togglebutton")['default']
    'ToggleSwitch': typeof import("primevue/toggleswitch")['default']
    'TreeSelect': typeof import("primevue/treeselect")['default']
    'Button': typeof import("primevue/button")['default']
    'ButtonGroup': typeof import("primevue/buttongroup")['default']
    'SpeedDial': typeof import("primevue/speeddial")['default']
    'SplitButton': typeof import("primevue/splitbutton")['default']
    'Column': typeof import("primevue/column")['default']
    'Row': typeof import("primevue/row")['default']
    'ColumnGroup': typeof import("primevue/columngroup")['default']
    'DataTable': typeof import("primevue/datatable")['default']
    'DataView': typeof import("primevue/dataview")['default']
    'OrderList': typeof import("primevue/orderlist")['default']
    'OrganizationChart': typeof import("primevue/organizationchart")['default']
    'Paginator': typeof import("primevue/paginator")['default']
    'PickList': typeof import("primevue/picklist")['default']
    'Tree': typeof import("primevue/tree")['default']
    'TreeTable': typeof import("primevue/treetable")['default']
    'Timeline': typeof import("primevue/timeline")['default']
    'VirtualScroller': typeof import("primevue/virtualscroller")['default']
    'Accordion': typeof import("primevue/accordion")['default']
    'AccordionPanel': typeof import("primevue/accordionpanel")['default']
    'AccordionHeader': typeof import("primevue/accordionheader")['default']
    'AccordionContent': typeof import("primevue/accordioncontent")['default']
    'AccordionTab': typeof import("primevue/accordiontab")['default']
    'Card': typeof import("primevue/card")['default']
    'DeferredContent': typeof import("primevue/deferredcontent")['default']
    'Divider': typeof import("primevue/divider")['default']
    'Fieldset': typeof import("primevue/fieldset")['default']
    'Panel': typeof import("primevue/panel")['default']
    'ScrollPanel': typeof import("primevue/scrollpanel")['default']
    'Splitter': typeof import("primevue/splitter")['default']
    'SplitterPanel': typeof import("primevue/splitterpanel")['default']
    'Stepper': typeof import("primevue/stepper")['default']
    'StepList': typeof import("primevue/steplist")['default']
    'Step': typeof import("primevue/step")['default']
    'StepItem': typeof import("primevue/stepitem")['default']
    'StepPanels': typeof import("primevue/steppanels")['default']
    'StepPanel': typeof import("primevue/steppanel")['default']
    'TabView': typeof import("primevue/tabview")['default']
    'Tabs': typeof import("primevue/tabs")['default']
    'TabList': typeof import("primevue/tablist")['default']
    'Tab': typeof import("primevue/tab")['default']
    'TabPanels': typeof import("primevue/tabpanels")['default']
    'TabPanel': typeof import("primevue/tabpanel")['default']
    'Toolbar': typeof import("primevue/toolbar")['default']
    'ConfirmDialog': typeof import("primevue/confirmdialog")['default']
    'ConfirmPopup': typeof import("primevue/confirmpopup")['default']
    'Dialog': typeof import("primevue/dialog")['default']
    'Drawer': typeof import("primevue/drawer")['default']
    'DynamicDialog': typeof import("primevue/dynamicdialog")['default']
    'OverlayPanel': typeof import("primevue/overlaypanel")['default']
    'Popover': typeof import("primevue/popover")['default']
    'Sidebar': typeof import("primevue/sidebar")['default']
    'FileUpload': typeof import("primevue/fileupload")['default']
    'Breadcrumb': typeof import("primevue/breadcrumb")['default']
    'ContextMenu': typeof import("primevue/contextmenu")['default']
    'Dock': typeof import("primevue/dock")['default']
    'Menu': typeof import("primevue/menu")['default']
    'Menubar': typeof import("primevue/menubar")['default']
    'MegaMenu': typeof import("primevue/megamenu")['default']
    'PanelMenu': typeof import("primevue/panelmenu")['default']
    'Steps': typeof import("primevue/steps")['default']
    'TabMenu': typeof import("primevue/tabmenu")['default']
    'TieredMenu': typeof import("primevue/tieredmenu")['default']
    'Message': typeof import("primevue/message")['default']
    'InlineMessage': typeof import("primevue/inlinemessage")['default']
    'Toast': typeof import("primevue/toast")['default']
    'Carousel': typeof import("primevue/carousel")['default']
    'Galleria': typeof import("primevue/galleria")['default']
    'Image': typeof import("primevue/image")['default']
    'ImageCompare': typeof import("primevue/imagecompare")['default']
    'Avatar': typeof import("primevue/avatar")['default']
    'AvatarGroup': typeof import("primevue/avatargroup")['default']
    'Badge': typeof import("primevue/badge")['default']
    'BlockUI': typeof import("primevue/blockui")['default']
    'Chip': typeof import("primevue/chip")['default']
    'Inplace': typeof import("primevue/inplace")['default']
    'MeterGroup': typeof import("primevue/metergroup")['default']
    'OverlayBadge': typeof import("primevue/overlaybadge")['default']
    'ScrollTop': typeof import("primevue/scrolltop")['default']
    'Skeleton': typeof import("primevue/skeleton")['default']
    'ProgressBar': typeof import("primevue/progressbar")['default']
    'ProgressSpinner': typeof import("primevue/progressspinner")['default']
    'Tag': typeof import("primevue/tag")['default']
    'Terminal': typeof import("primevue/terminal")['default']
    'Form': typeof import("@primevue/forms/form")['default']
    'FormField': typeof import("@primevue/forms/formfield")['default']
    'Icon': typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyArticleMetadata': LazyComponent<typeof import("../components/ArticleMetadata.vue")['default']>
    'LazyBlogCard': LazyComponent<typeof import("../components/BlogCard.vue")['default']>
    'LazyClients': LazyComponent<typeof import("../components/Clients.vue")['default']>
    'LazyColourGrading': LazyComponent<typeof import("../components/ColourGrading.vue")['default']>
    'LazyCompanyTimeline': LazyComponent<typeof import("../components/CompanyTimeline.vue")['default']>
    'LazyCookies': LazyComponent<typeof import("../components/Cookies.vue")['default']>
    'LazyEmployees': LazyComponent<typeof import("../components/Employees.vue")['default']>
    'LazyFooter': LazyComponent<typeof import("../components/Footer.vue")['default']>
    'LazyFurtherReading': LazyComponent<typeof import("../components/FurtherReading.vue")['default']>
    'LazyFurtherServices': LazyComponent<typeof import("../components/FurtherServices.vue")['default']>
    'LazyGalleryItem': LazyComponent<typeof import("../components/GalleryItem.vue")['default']>
    'LazyHeroVideo': LazyComponent<typeof import("../components/HeroVideo.vue")['default']>
    'LazyImg': LazyComponent<typeof import("../components/Img.vue")['default']>
    'LazyLatestArticle': LazyComponent<typeof import("../components/LatestArticle.vue")['default']>
    'LazyLightroomPresets': LazyComponent<typeof import("../components/LightroomPresets.vue")['default']>
    'LazyMap': LazyComponent<typeof import("../components/Map.vue")['default']>
    'LazyNavBar': LazyComponent<typeof import("../components/NavBar.vue")['default']>
    'LazyReels': LazyComponent<typeof import("../components/Reels.vue")['default']>
    'LazyRequestProposal': LazyComponent<typeof import("../components/RequestProposal.vue")['default']>
    'LazyReviews': LazyComponent<typeof import("../components/Reviews.vue")['default']>
    'LazyServices': LazyComponent<typeof import("../components/Services.vue")['default']>
    'LazySkeletonArticle': LazyComponent<typeof import("../components/SkeletonArticle.vue")['default']>
    'LazySkeletonGalleryItem': LazyComponent<typeof import("../components/SkeletonGalleryItem.vue")['default']>
    'LazySkeletonLatestArticle': LazyComponent<typeof import("../components/SkeletonLatestArticle.vue")['default']>
    'LazySkeletonServices': LazyComponent<typeof import("../components/SkeletonServices.vue")['default']>
    'LazySkeletonSwiper': LazyComponent<typeof import("../components/SkeletonSwiper.vue")['default']>
    'LazySocialIcon': LazyComponent<typeof import("../components/SocialIcon.vue")['default']>
    'LazySoundEdit': LazyComponent<typeof import("../components/SoundEdit.vue")['default']>
    'LazySwiperFurtherServices': LazyComponent<typeof import("../components/SwiperFurtherServices.vue")['default']>
    'LazyVideoItem': LazyComponent<typeof import("../components/VideoItem.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyAutoComplete': LazyComponent<typeof import("primevue/autocomplete")['default']>
    'LazyCalendar': LazyComponent<typeof import("primevue/calendar")['default']>
    'LazyCascadeSelect': LazyComponent<typeof import("primevue/cascadeselect")['default']>
    'LazyCheckbox': LazyComponent<typeof import("primevue/checkbox")['default']>
    'LazyCheckboxGroup': LazyComponent<typeof import("primevue/checkboxgroup")['default']>
    'LazyChips': LazyComponent<typeof import("primevue/chips")['default']>
    'LazyColorPicker': LazyComponent<typeof import("primevue/colorpicker")['default']>
    'LazyDatePicker': LazyComponent<typeof import("primevue/datepicker")['default']>
    'LazyDropdown': LazyComponent<typeof import("primevue/dropdown")['default']>
    'LazyFloatLabel': LazyComponent<typeof import("primevue/floatlabel")['default']>
    'LazyFluid': LazyComponent<typeof import("primevue/fluid")['default']>
    'LazyIconField': LazyComponent<typeof import("primevue/iconfield")['default']>
    'LazyIftaLabel': LazyComponent<typeof import("primevue/iftalabel")['default']>
    'LazyInputChips': LazyComponent<typeof import("primevue/inputchips")['default']>
    'LazyInputGroup': LazyComponent<typeof import("primevue/inputgroup")['default']>
    'LazyInputGroupAddon': LazyComponent<typeof import("primevue/inputgroupaddon")['default']>
    'LazyInputIcon': LazyComponent<typeof import("primevue/inputicon")['default']>
    'LazyInputMask': LazyComponent<typeof import("primevue/inputmask")['default']>
    'LazyInputNumber': LazyComponent<typeof import("primevue/inputnumber")['default']>
    'LazyInputOtp': LazyComponent<typeof import("primevue/inputotp")['default']>
    'LazyInputSwitch': LazyComponent<typeof import("primevue/inputswitch")['default']>
    'LazyInputText': LazyComponent<typeof import("primevue/inputtext")['default']>
    'LazyKnob': LazyComponent<typeof import("primevue/knob")['default']>
    'LazyListbox': LazyComponent<typeof import("primevue/listbox")['default']>
    'LazyMultiSelect': LazyComponent<typeof import("primevue/multiselect")['default']>
    'LazyPassword': LazyComponent<typeof import("primevue/password")['default']>
    'LazyRadioButton': LazyComponent<typeof import("primevue/radiobutton")['default']>
    'LazyRadioButtonGroup': LazyComponent<typeof import("primevue/radiobuttongroup")['default']>
    'LazyRating': LazyComponent<typeof import("primevue/rating")['default']>
    'LazySelect': LazyComponent<typeof import("primevue/select")['default']>
    'LazySelectButton': LazyComponent<typeof import("primevue/selectbutton")['default']>
    'LazySlider': LazyComponent<typeof import("primevue/slider")['default']>
    'LazyTextarea': LazyComponent<typeof import("primevue/textarea")['default']>
    'LazyToggleButton': LazyComponent<typeof import("primevue/togglebutton")['default']>
    'LazyToggleSwitch': LazyComponent<typeof import("primevue/toggleswitch")['default']>
    'LazyTreeSelect': LazyComponent<typeof import("primevue/treeselect")['default']>
    'LazyButton': LazyComponent<typeof import("primevue/button")['default']>
    'LazyButtonGroup': LazyComponent<typeof import("primevue/buttongroup")['default']>
    'LazySpeedDial': LazyComponent<typeof import("primevue/speeddial")['default']>
    'LazySplitButton': LazyComponent<typeof import("primevue/splitbutton")['default']>
    'LazyColumn': LazyComponent<typeof import("primevue/column")['default']>
    'LazyRow': LazyComponent<typeof import("primevue/row")['default']>
    'LazyColumnGroup': LazyComponent<typeof import("primevue/columngroup")['default']>
    'LazyDataTable': LazyComponent<typeof import("primevue/datatable")['default']>
    'LazyDataView': LazyComponent<typeof import("primevue/dataview")['default']>
    'LazyOrderList': LazyComponent<typeof import("primevue/orderlist")['default']>
    'LazyOrganizationChart': LazyComponent<typeof import("primevue/organizationchart")['default']>
    'LazyPaginator': LazyComponent<typeof import("primevue/paginator")['default']>
    'LazyPickList': LazyComponent<typeof import("primevue/picklist")['default']>
    'LazyTree': LazyComponent<typeof import("primevue/tree")['default']>
    'LazyTreeTable': LazyComponent<typeof import("primevue/treetable")['default']>
    'LazyTimeline': LazyComponent<typeof import("primevue/timeline")['default']>
    'LazyVirtualScroller': LazyComponent<typeof import("primevue/virtualscroller")['default']>
    'LazyAccordion': LazyComponent<typeof import("primevue/accordion")['default']>
    'LazyAccordionPanel': LazyComponent<typeof import("primevue/accordionpanel")['default']>
    'LazyAccordionHeader': LazyComponent<typeof import("primevue/accordionheader")['default']>
    'LazyAccordionContent': LazyComponent<typeof import("primevue/accordioncontent")['default']>
    'LazyAccordionTab': LazyComponent<typeof import("primevue/accordiontab")['default']>
    'LazyCard': LazyComponent<typeof import("primevue/card")['default']>
    'LazyDeferredContent': LazyComponent<typeof import("primevue/deferredcontent")['default']>
    'LazyDivider': LazyComponent<typeof import("primevue/divider")['default']>
    'LazyFieldset': LazyComponent<typeof import("primevue/fieldset")['default']>
    'LazyPanel': LazyComponent<typeof import("primevue/panel")['default']>
    'LazyScrollPanel': LazyComponent<typeof import("primevue/scrollpanel")['default']>
    'LazySplitter': LazyComponent<typeof import("primevue/splitter")['default']>
    'LazySplitterPanel': LazyComponent<typeof import("primevue/splitterpanel")['default']>
    'LazyStepper': LazyComponent<typeof import("primevue/stepper")['default']>
    'LazyStepList': LazyComponent<typeof import("primevue/steplist")['default']>
    'LazyStep': LazyComponent<typeof import("primevue/step")['default']>
    'LazyStepItem': LazyComponent<typeof import("primevue/stepitem")['default']>
    'LazyStepPanels': LazyComponent<typeof import("primevue/steppanels")['default']>
    'LazyStepPanel': LazyComponent<typeof import("primevue/steppanel")['default']>
    'LazyTabView': LazyComponent<typeof import("primevue/tabview")['default']>
    'LazyTabs': LazyComponent<typeof import("primevue/tabs")['default']>
    'LazyTabList': LazyComponent<typeof import("primevue/tablist")['default']>
    'LazyTab': LazyComponent<typeof import("primevue/tab")['default']>
    'LazyTabPanels': LazyComponent<typeof import("primevue/tabpanels")['default']>
    'LazyTabPanel': LazyComponent<typeof import("primevue/tabpanel")['default']>
    'LazyToolbar': LazyComponent<typeof import("primevue/toolbar")['default']>
    'LazyConfirmDialog': LazyComponent<typeof import("primevue/confirmdialog")['default']>
    'LazyConfirmPopup': LazyComponent<typeof import("primevue/confirmpopup")['default']>
    'LazyDialog': LazyComponent<typeof import("primevue/dialog")['default']>
    'LazyDrawer': LazyComponent<typeof import("primevue/drawer")['default']>
    'LazyDynamicDialog': LazyComponent<typeof import("primevue/dynamicdialog")['default']>
    'LazyOverlayPanel': LazyComponent<typeof import("primevue/overlaypanel")['default']>
    'LazyPopover': LazyComponent<typeof import("primevue/popover")['default']>
    'LazySidebar': LazyComponent<typeof import("primevue/sidebar")['default']>
    'LazyFileUpload': LazyComponent<typeof import("primevue/fileupload")['default']>
    'LazyBreadcrumb': LazyComponent<typeof import("primevue/breadcrumb")['default']>
    'LazyContextMenu': LazyComponent<typeof import("primevue/contextmenu")['default']>
    'LazyDock': LazyComponent<typeof import("primevue/dock")['default']>
    'LazyMenu': LazyComponent<typeof import("primevue/menu")['default']>
    'LazyMenubar': LazyComponent<typeof import("primevue/menubar")['default']>
    'LazyMegaMenu': LazyComponent<typeof import("primevue/megamenu")['default']>
    'LazyPanelMenu': LazyComponent<typeof import("primevue/panelmenu")['default']>
    'LazySteps': LazyComponent<typeof import("primevue/steps")['default']>
    'LazyTabMenu': LazyComponent<typeof import("primevue/tabmenu")['default']>
    'LazyTieredMenu': LazyComponent<typeof import("primevue/tieredmenu")['default']>
    'LazyMessage': LazyComponent<typeof import("primevue/message")['default']>
    'LazyInlineMessage': LazyComponent<typeof import("primevue/inlinemessage")['default']>
    'LazyToast': LazyComponent<typeof import("primevue/toast")['default']>
    'LazyCarousel': LazyComponent<typeof import("primevue/carousel")['default']>
    'LazyGalleria': LazyComponent<typeof import("primevue/galleria")['default']>
    'LazyImage': LazyComponent<typeof import("primevue/image")['default']>
    'LazyImageCompare': LazyComponent<typeof import("primevue/imagecompare")['default']>
    'LazyAvatar': LazyComponent<typeof import("primevue/avatar")['default']>
    'LazyAvatarGroup': LazyComponent<typeof import("primevue/avatargroup")['default']>
    'LazyBadge': LazyComponent<typeof import("primevue/badge")['default']>
    'LazyBlockUI': LazyComponent<typeof import("primevue/blockui")['default']>
    'LazyChip': LazyComponent<typeof import("primevue/chip")['default']>
    'LazyInplace': LazyComponent<typeof import("primevue/inplace")['default']>
    'LazyMeterGroup': LazyComponent<typeof import("primevue/metergroup")['default']>
    'LazyOverlayBadge': LazyComponent<typeof import("primevue/overlaybadge")['default']>
    'LazyScrollTop': LazyComponent<typeof import("primevue/scrolltop")['default']>
    'LazySkeleton': LazyComponent<typeof import("primevue/skeleton")['default']>
    'LazyProgressBar': LazyComponent<typeof import("primevue/progressbar")['default']>
    'LazyProgressSpinner': LazyComponent<typeof import("primevue/progressspinner")['default']>
    'LazyTag': LazyComponent<typeof import("primevue/tag")['default']>
    'LazyTerminal': LazyComponent<typeof import("primevue/terminal")['default']>
    'LazyForm': LazyComponent<typeof import("@primevue/forms/form")['default']>
    'LazyFormField': LazyComponent<typeof import("@primevue/forms/formfield")['default']>
    'LazyIcon': LazyComponent<typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const ArticleMetadata: typeof import("../components/ArticleMetadata.vue")['default']
export const BlogCard: typeof import("../components/BlogCard.vue")['default']
export const Clients: typeof import("../components/Clients.vue")['default']
export const ColourGrading: typeof import("../components/ColourGrading.vue")['default']
export const CompanyTimeline: typeof import("../components/CompanyTimeline.vue")['default']
export const Cookies: typeof import("../components/Cookies.vue")['default']
export const Employees: typeof import("../components/Employees.vue")['default']
export const Footer: typeof import("../components/Footer.vue")['default']
export const FurtherReading: typeof import("../components/FurtherReading.vue")['default']
export const FurtherServices: typeof import("../components/FurtherServices.vue")['default']
export const GalleryItem: typeof import("../components/GalleryItem.vue")['default']
export const HeroVideo: typeof import("../components/HeroVideo.vue")['default']
export const Img: typeof import("../components/Img.vue")['default']
export const LatestArticle: typeof import("../components/LatestArticle.vue")['default']
export const LightroomPresets: typeof import("../components/LightroomPresets.vue")['default']
export const Map: typeof import("../components/Map.vue")['default']
export const NavBar: typeof import("../components/NavBar.vue")['default']
export const Reels: typeof import("../components/Reels.vue")['default']
export const RequestProposal: typeof import("../components/RequestProposal.vue")['default']
export const Reviews: typeof import("../components/Reviews.vue")['default']
export const Services: typeof import("../components/Services.vue")['default']
export const SkeletonArticle: typeof import("../components/SkeletonArticle.vue")['default']
export const SkeletonGalleryItem: typeof import("../components/SkeletonGalleryItem.vue")['default']
export const SkeletonLatestArticle: typeof import("../components/SkeletonLatestArticle.vue")['default']
export const SkeletonServices: typeof import("../components/SkeletonServices.vue")['default']
export const SkeletonSwiper: typeof import("../components/SkeletonSwiper.vue")['default']
export const SocialIcon: typeof import("../components/SocialIcon.vue")['default']
export const SoundEdit: typeof import("../components/SoundEdit.vue")['default']
export const SwiperFurtherServices: typeof import("../components/SwiperFurtherServices.vue")['default']
export const VideoItem: typeof import("../components/VideoItem.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const AutoComplete: typeof import("primevue/autocomplete")['default']
export const Calendar: typeof import("primevue/calendar")['default']
export const CascadeSelect: typeof import("primevue/cascadeselect")['default']
export const Checkbox: typeof import("primevue/checkbox")['default']
export const CheckboxGroup: typeof import("primevue/checkboxgroup")['default']
export const Chips: typeof import("primevue/chips")['default']
export const ColorPicker: typeof import("primevue/colorpicker")['default']
export const DatePicker: typeof import("primevue/datepicker")['default']
export const Dropdown: typeof import("primevue/dropdown")['default']
export const FloatLabel: typeof import("primevue/floatlabel")['default']
export const Fluid: typeof import("primevue/fluid")['default']
export const IconField: typeof import("primevue/iconfield")['default']
export const IftaLabel: typeof import("primevue/iftalabel")['default']
export const InputChips: typeof import("primevue/inputchips")['default']
export const InputGroup: typeof import("primevue/inputgroup")['default']
export const InputGroupAddon: typeof import("primevue/inputgroupaddon")['default']
export const InputIcon: typeof import("primevue/inputicon")['default']
export const InputMask: typeof import("primevue/inputmask")['default']
export const InputNumber: typeof import("primevue/inputnumber")['default']
export const InputOtp: typeof import("primevue/inputotp")['default']
export const InputSwitch: typeof import("primevue/inputswitch")['default']
export const InputText: typeof import("primevue/inputtext")['default']
export const Knob: typeof import("primevue/knob")['default']
export const Listbox: typeof import("primevue/listbox")['default']
export const MultiSelect: typeof import("primevue/multiselect")['default']
export const Password: typeof import("primevue/password")['default']
export const RadioButton: typeof import("primevue/radiobutton")['default']
export const RadioButtonGroup: typeof import("primevue/radiobuttongroup")['default']
export const Rating: typeof import("primevue/rating")['default']
export const Select: typeof import("primevue/select")['default']
export const SelectButton: typeof import("primevue/selectbutton")['default']
export const Slider: typeof import("primevue/slider")['default']
export const Textarea: typeof import("primevue/textarea")['default']
export const ToggleButton: typeof import("primevue/togglebutton")['default']
export const ToggleSwitch: typeof import("primevue/toggleswitch")['default']
export const TreeSelect: typeof import("primevue/treeselect")['default']
export const Button: typeof import("primevue/button")['default']
export const ButtonGroup: typeof import("primevue/buttongroup")['default']
export const SpeedDial: typeof import("primevue/speeddial")['default']
export const SplitButton: typeof import("primevue/splitbutton")['default']
export const Column: typeof import("primevue/column")['default']
export const Row: typeof import("primevue/row")['default']
export const ColumnGroup: typeof import("primevue/columngroup")['default']
export const DataTable: typeof import("primevue/datatable")['default']
export const DataView: typeof import("primevue/dataview")['default']
export const OrderList: typeof import("primevue/orderlist")['default']
export const OrganizationChart: typeof import("primevue/organizationchart")['default']
export const Paginator: typeof import("primevue/paginator")['default']
export const PickList: typeof import("primevue/picklist")['default']
export const Tree: typeof import("primevue/tree")['default']
export const TreeTable: typeof import("primevue/treetable")['default']
export const Timeline: typeof import("primevue/timeline")['default']
export const VirtualScroller: typeof import("primevue/virtualscroller")['default']
export const Accordion: typeof import("primevue/accordion")['default']
export const AccordionPanel: typeof import("primevue/accordionpanel")['default']
export const AccordionHeader: typeof import("primevue/accordionheader")['default']
export const AccordionContent: typeof import("primevue/accordioncontent")['default']
export const AccordionTab: typeof import("primevue/accordiontab")['default']
export const Card: typeof import("primevue/card")['default']
export const DeferredContent: typeof import("primevue/deferredcontent")['default']
export const Divider: typeof import("primevue/divider")['default']
export const Fieldset: typeof import("primevue/fieldset")['default']
export const Panel: typeof import("primevue/panel")['default']
export const ScrollPanel: typeof import("primevue/scrollpanel")['default']
export const Splitter: typeof import("primevue/splitter")['default']
export const SplitterPanel: typeof import("primevue/splitterpanel")['default']
export const Stepper: typeof import("primevue/stepper")['default']
export const StepList: typeof import("primevue/steplist")['default']
export const Step: typeof import("primevue/step")['default']
export const StepItem: typeof import("primevue/stepitem")['default']
export const StepPanels: typeof import("primevue/steppanels")['default']
export const StepPanel: typeof import("primevue/steppanel")['default']
export const TabView: typeof import("primevue/tabview")['default']
export const Tabs: typeof import("primevue/tabs")['default']
export const TabList: typeof import("primevue/tablist")['default']
export const Tab: typeof import("primevue/tab")['default']
export const TabPanels: typeof import("primevue/tabpanels")['default']
export const TabPanel: typeof import("primevue/tabpanel")['default']
export const Toolbar: typeof import("primevue/toolbar")['default']
export const ConfirmDialog: typeof import("primevue/confirmdialog")['default']
export const ConfirmPopup: typeof import("primevue/confirmpopup")['default']
export const Dialog: typeof import("primevue/dialog")['default']
export const Drawer: typeof import("primevue/drawer")['default']
export const DynamicDialog: typeof import("primevue/dynamicdialog")['default']
export const OverlayPanel: typeof import("primevue/overlaypanel")['default']
export const Popover: typeof import("primevue/popover")['default']
export const Sidebar: typeof import("primevue/sidebar")['default']
export const FileUpload: typeof import("primevue/fileupload")['default']
export const Breadcrumb: typeof import("primevue/breadcrumb")['default']
export const ContextMenu: typeof import("primevue/contextmenu")['default']
export const Dock: typeof import("primevue/dock")['default']
export const Menu: typeof import("primevue/menu")['default']
export const Menubar: typeof import("primevue/menubar")['default']
export const MegaMenu: typeof import("primevue/megamenu")['default']
export const PanelMenu: typeof import("primevue/panelmenu")['default']
export const Steps: typeof import("primevue/steps")['default']
export const TabMenu: typeof import("primevue/tabmenu")['default']
export const TieredMenu: typeof import("primevue/tieredmenu")['default']
export const Message: typeof import("primevue/message")['default']
export const InlineMessage: typeof import("primevue/inlinemessage")['default']
export const Toast: typeof import("primevue/toast")['default']
export const Carousel: typeof import("primevue/carousel")['default']
export const Galleria: typeof import("primevue/galleria")['default']
export const Image: typeof import("primevue/image")['default']
export const ImageCompare: typeof import("primevue/imagecompare")['default']
export const Avatar: typeof import("primevue/avatar")['default']
export const AvatarGroup: typeof import("primevue/avatargroup")['default']
export const Badge: typeof import("primevue/badge")['default']
export const BlockUI: typeof import("primevue/blockui")['default']
export const Chip: typeof import("primevue/chip")['default']
export const Inplace: typeof import("primevue/inplace")['default']
export const MeterGroup: typeof import("primevue/metergroup")['default']
export const OverlayBadge: typeof import("primevue/overlaybadge")['default']
export const ScrollTop: typeof import("primevue/scrolltop")['default']
export const Skeleton: typeof import("primevue/skeleton")['default']
export const ProgressBar: typeof import("primevue/progressbar")['default']
export const ProgressSpinner: typeof import("primevue/progressspinner")['default']
export const Tag: typeof import("primevue/tag")['default']
export const Terminal: typeof import("primevue/terminal")['default']
export const Form: typeof import("@primevue/forms/form")['default']
export const FormField: typeof import("@primevue/forms/formfield")['default']
export const Icon: typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyArticleMetadata: LazyComponent<typeof import("../components/ArticleMetadata.vue")['default']>
export const LazyBlogCard: LazyComponent<typeof import("../components/BlogCard.vue")['default']>
export const LazyClients: LazyComponent<typeof import("../components/Clients.vue")['default']>
export const LazyColourGrading: LazyComponent<typeof import("../components/ColourGrading.vue")['default']>
export const LazyCompanyTimeline: LazyComponent<typeof import("../components/CompanyTimeline.vue")['default']>
export const LazyCookies: LazyComponent<typeof import("../components/Cookies.vue")['default']>
export const LazyEmployees: LazyComponent<typeof import("../components/Employees.vue")['default']>
export const LazyFooter: LazyComponent<typeof import("../components/Footer.vue")['default']>
export const LazyFurtherReading: LazyComponent<typeof import("../components/FurtherReading.vue")['default']>
export const LazyFurtherServices: LazyComponent<typeof import("../components/FurtherServices.vue")['default']>
export const LazyGalleryItem: LazyComponent<typeof import("../components/GalleryItem.vue")['default']>
export const LazyHeroVideo: LazyComponent<typeof import("../components/HeroVideo.vue")['default']>
export const LazyImg: LazyComponent<typeof import("../components/Img.vue")['default']>
export const LazyLatestArticle: LazyComponent<typeof import("../components/LatestArticle.vue")['default']>
export const LazyLightroomPresets: LazyComponent<typeof import("../components/LightroomPresets.vue")['default']>
export const LazyMap: LazyComponent<typeof import("../components/Map.vue")['default']>
export const LazyNavBar: LazyComponent<typeof import("../components/NavBar.vue")['default']>
export const LazyReels: LazyComponent<typeof import("../components/Reels.vue")['default']>
export const LazyRequestProposal: LazyComponent<typeof import("../components/RequestProposal.vue")['default']>
export const LazyReviews: LazyComponent<typeof import("../components/Reviews.vue")['default']>
export const LazyServices: LazyComponent<typeof import("../components/Services.vue")['default']>
export const LazySkeletonArticle: LazyComponent<typeof import("../components/SkeletonArticle.vue")['default']>
export const LazySkeletonGalleryItem: LazyComponent<typeof import("../components/SkeletonGalleryItem.vue")['default']>
export const LazySkeletonLatestArticle: LazyComponent<typeof import("../components/SkeletonLatestArticle.vue")['default']>
export const LazySkeletonServices: LazyComponent<typeof import("../components/SkeletonServices.vue")['default']>
export const LazySkeletonSwiper: LazyComponent<typeof import("../components/SkeletonSwiper.vue")['default']>
export const LazySocialIcon: LazyComponent<typeof import("../components/SocialIcon.vue")['default']>
export const LazySoundEdit: LazyComponent<typeof import("../components/SoundEdit.vue")['default']>
export const LazySwiperFurtherServices: LazyComponent<typeof import("../components/SwiperFurtherServices.vue")['default']>
export const LazyVideoItem: LazyComponent<typeof import("../components/VideoItem.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyAutoComplete: LazyComponent<typeof import("primevue/autocomplete")['default']>
export const LazyCalendar: LazyComponent<typeof import("primevue/calendar")['default']>
export const LazyCascadeSelect: LazyComponent<typeof import("primevue/cascadeselect")['default']>
export const LazyCheckbox: LazyComponent<typeof import("primevue/checkbox")['default']>
export const LazyCheckboxGroup: LazyComponent<typeof import("primevue/checkboxgroup")['default']>
export const LazyChips: LazyComponent<typeof import("primevue/chips")['default']>
export const LazyColorPicker: LazyComponent<typeof import("primevue/colorpicker")['default']>
export const LazyDatePicker: LazyComponent<typeof import("primevue/datepicker")['default']>
export const LazyDropdown: LazyComponent<typeof import("primevue/dropdown")['default']>
export const LazyFloatLabel: LazyComponent<typeof import("primevue/floatlabel")['default']>
export const LazyFluid: LazyComponent<typeof import("primevue/fluid")['default']>
export const LazyIconField: LazyComponent<typeof import("primevue/iconfield")['default']>
export const LazyIftaLabel: LazyComponent<typeof import("primevue/iftalabel")['default']>
export const LazyInputChips: LazyComponent<typeof import("primevue/inputchips")['default']>
export const LazyInputGroup: LazyComponent<typeof import("primevue/inputgroup")['default']>
export const LazyInputGroupAddon: LazyComponent<typeof import("primevue/inputgroupaddon")['default']>
export const LazyInputIcon: LazyComponent<typeof import("primevue/inputicon")['default']>
export const LazyInputMask: LazyComponent<typeof import("primevue/inputmask")['default']>
export const LazyInputNumber: LazyComponent<typeof import("primevue/inputnumber")['default']>
export const LazyInputOtp: LazyComponent<typeof import("primevue/inputotp")['default']>
export const LazyInputSwitch: LazyComponent<typeof import("primevue/inputswitch")['default']>
export const LazyInputText: LazyComponent<typeof import("primevue/inputtext")['default']>
export const LazyKnob: LazyComponent<typeof import("primevue/knob")['default']>
export const LazyListbox: LazyComponent<typeof import("primevue/listbox")['default']>
export const LazyMultiSelect: LazyComponent<typeof import("primevue/multiselect")['default']>
export const LazyPassword: LazyComponent<typeof import("primevue/password")['default']>
export const LazyRadioButton: LazyComponent<typeof import("primevue/radiobutton")['default']>
export const LazyRadioButtonGroup: LazyComponent<typeof import("primevue/radiobuttongroup")['default']>
export const LazyRating: LazyComponent<typeof import("primevue/rating")['default']>
export const LazySelect: LazyComponent<typeof import("primevue/select")['default']>
export const LazySelectButton: LazyComponent<typeof import("primevue/selectbutton")['default']>
export const LazySlider: LazyComponent<typeof import("primevue/slider")['default']>
export const LazyTextarea: LazyComponent<typeof import("primevue/textarea")['default']>
export const LazyToggleButton: LazyComponent<typeof import("primevue/togglebutton")['default']>
export const LazyToggleSwitch: LazyComponent<typeof import("primevue/toggleswitch")['default']>
export const LazyTreeSelect: LazyComponent<typeof import("primevue/treeselect")['default']>
export const LazyButton: LazyComponent<typeof import("primevue/button")['default']>
export const LazyButtonGroup: LazyComponent<typeof import("primevue/buttongroup")['default']>
export const LazySpeedDial: LazyComponent<typeof import("primevue/speeddial")['default']>
export const LazySplitButton: LazyComponent<typeof import("primevue/splitbutton")['default']>
export const LazyColumn: LazyComponent<typeof import("primevue/column")['default']>
export const LazyRow: LazyComponent<typeof import("primevue/row")['default']>
export const LazyColumnGroup: LazyComponent<typeof import("primevue/columngroup")['default']>
export const LazyDataTable: LazyComponent<typeof import("primevue/datatable")['default']>
export const LazyDataView: LazyComponent<typeof import("primevue/dataview")['default']>
export const LazyOrderList: LazyComponent<typeof import("primevue/orderlist")['default']>
export const LazyOrganizationChart: LazyComponent<typeof import("primevue/organizationchart")['default']>
export const LazyPaginator: LazyComponent<typeof import("primevue/paginator")['default']>
export const LazyPickList: LazyComponent<typeof import("primevue/picklist")['default']>
export const LazyTree: LazyComponent<typeof import("primevue/tree")['default']>
export const LazyTreeTable: LazyComponent<typeof import("primevue/treetable")['default']>
export const LazyTimeline: LazyComponent<typeof import("primevue/timeline")['default']>
export const LazyVirtualScroller: LazyComponent<typeof import("primevue/virtualscroller")['default']>
export const LazyAccordion: LazyComponent<typeof import("primevue/accordion")['default']>
export const LazyAccordionPanel: LazyComponent<typeof import("primevue/accordionpanel")['default']>
export const LazyAccordionHeader: LazyComponent<typeof import("primevue/accordionheader")['default']>
export const LazyAccordionContent: LazyComponent<typeof import("primevue/accordioncontent")['default']>
export const LazyAccordionTab: LazyComponent<typeof import("primevue/accordiontab")['default']>
export const LazyCard: LazyComponent<typeof import("primevue/card")['default']>
export const LazyDeferredContent: LazyComponent<typeof import("primevue/deferredcontent")['default']>
export const LazyDivider: LazyComponent<typeof import("primevue/divider")['default']>
export const LazyFieldset: LazyComponent<typeof import("primevue/fieldset")['default']>
export const LazyPanel: LazyComponent<typeof import("primevue/panel")['default']>
export const LazyScrollPanel: LazyComponent<typeof import("primevue/scrollpanel")['default']>
export const LazySplitter: LazyComponent<typeof import("primevue/splitter")['default']>
export const LazySplitterPanel: LazyComponent<typeof import("primevue/splitterpanel")['default']>
export const LazyStepper: LazyComponent<typeof import("primevue/stepper")['default']>
export const LazyStepList: LazyComponent<typeof import("primevue/steplist")['default']>
export const LazyStep: LazyComponent<typeof import("primevue/step")['default']>
export const LazyStepItem: LazyComponent<typeof import("primevue/stepitem")['default']>
export const LazyStepPanels: LazyComponent<typeof import("primevue/steppanels")['default']>
export const LazyStepPanel: LazyComponent<typeof import("primevue/steppanel")['default']>
export const LazyTabView: LazyComponent<typeof import("primevue/tabview")['default']>
export const LazyTabs: LazyComponent<typeof import("primevue/tabs")['default']>
export const LazyTabList: LazyComponent<typeof import("primevue/tablist")['default']>
export const LazyTab: LazyComponent<typeof import("primevue/tab")['default']>
export const LazyTabPanels: LazyComponent<typeof import("primevue/tabpanels")['default']>
export const LazyTabPanel: LazyComponent<typeof import("primevue/tabpanel")['default']>
export const LazyToolbar: LazyComponent<typeof import("primevue/toolbar")['default']>
export const LazyConfirmDialog: LazyComponent<typeof import("primevue/confirmdialog")['default']>
export const LazyConfirmPopup: LazyComponent<typeof import("primevue/confirmpopup")['default']>
export const LazyDialog: LazyComponent<typeof import("primevue/dialog")['default']>
export const LazyDrawer: LazyComponent<typeof import("primevue/drawer")['default']>
export const LazyDynamicDialog: LazyComponent<typeof import("primevue/dynamicdialog")['default']>
export const LazyOverlayPanel: LazyComponent<typeof import("primevue/overlaypanel")['default']>
export const LazyPopover: LazyComponent<typeof import("primevue/popover")['default']>
export const LazySidebar: LazyComponent<typeof import("primevue/sidebar")['default']>
export const LazyFileUpload: LazyComponent<typeof import("primevue/fileupload")['default']>
export const LazyBreadcrumb: LazyComponent<typeof import("primevue/breadcrumb")['default']>
export const LazyContextMenu: LazyComponent<typeof import("primevue/contextmenu")['default']>
export const LazyDock: LazyComponent<typeof import("primevue/dock")['default']>
export const LazyMenu: LazyComponent<typeof import("primevue/menu")['default']>
export const LazyMenubar: LazyComponent<typeof import("primevue/menubar")['default']>
export const LazyMegaMenu: LazyComponent<typeof import("primevue/megamenu")['default']>
export const LazyPanelMenu: LazyComponent<typeof import("primevue/panelmenu")['default']>
export const LazySteps: LazyComponent<typeof import("primevue/steps")['default']>
export const LazyTabMenu: LazyComponent<typeof import("primevue/tabmenu")['default']>
export const LazyTieredMenu: LazyComponent<typeof import("primevue/tieredmenu")['default']>
export const LazyMessage: LazyComponent<typeof import("primevue/message")['default']>
export const LazyInlineMessage: LazyComponent<typeof import("primevue/inlinemessage")['default']>
export const LazyToast: LazyComponent<typeof import("primevue/toast")['default']>
export const LazyCarousel: LazyComponent<typeof import("primevue/carousel")['default']>
export const LazyGalleria: LazyComponent<typeof import("primevue/galleria")['default']>
export const LazyImage: LazyComponent<typeof import("primevue/image")['default']>
export const LazyImageCompare: LazyComponent<typeof import("primevue/imagecompare")['default']>
export const LazyAvatar: LazyComponent<typeof import("primevue/avatar")['default']>
export const LazyAvatarGroup: LazyComponent<typeof import("primevue/avatargroup")['default']>
export const LazyBadge: LazyComponent<typeof import("primevue/badge")['default']>
export const LazyBlockUI: LazyComponent<typeof import("primevue/blockui")['default']>
export const LazyChip: LazyComponent<typeof import("primevue/chip")['default']>
export const LazyInplace: LazyComponent<typeof import("primevue/inplace")['default']>
export const LazyMeterGroup: LazyComponent<typeof import("primevue/metergroup")['default']>
export const LazyOverlayBadge: LazyComponent<typeof import("primevue/overlaybadge")['default']>
export const LazyScrollTop: LazyComponent<typeof import("primevue/scrolltop")['default']>
export const LazySkeleton: LazyComponent<typeof import("primevue/skeleton")['default']>
export const LazyProgressBar: LazyComponent<typeof import("primevue/progressbar")['default']>
export const LazyProgressSpinner: LazyComponent<typeof import("primevue/progressspinner")['default']>
export const LazyTag: LazyComponent<typeof import("primevue/tag")['default']>
export const LazyTerminal: LazyComponent<typeof import("primevue/terminal")['default']>
export const LazyForm: LazyComponent<typeof import("@primevue/forms/form")['default']>
export const LazyFormField: LazyComponent<typeof import("@primevue/forms/formfield")['default']>
export const LazyIcon: LazyComponent<typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
