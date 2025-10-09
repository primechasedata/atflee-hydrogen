import {Icon} from '~/components/Icon';

export function TrustRow({
  className,
  reviewsText = '★★★★★ 1,248 reviews',
  returnsText = 'Free 30-day returns',
  shippingText = 'Ships in 24 hours',
}: {
  className?: string;
  reviewsText?: string;
  returnsText?: string;
  shippingText?: string;
}) {
  return (
    <div
      className={
        className ||
        'mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-600'
      }
      aria-label="Store trust information"
    >
      <span className="flex items-center gap-2">
        <span aria-hidden>★★★★★</span>
        <span className="sr-only">5 out of 5 stars</span>
        <span>{reviewsText}</span>
      </span>
      <span className="flex items-center gap-2">
        <Icon name="check" />
        <span>{returnsText}</span>
      </span>
      <span className="flex items-center gap-2">
        <Icon name="truck" />
        <span>{shippingText}</span>
      </span>
    </div>
  );
}

