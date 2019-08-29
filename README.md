https://ruiwang-quant.github.io/timestable/

rm -rf docs

ng build --prod --output-path docs --base-href /timestable/

cp docs/index.html docs/404.html