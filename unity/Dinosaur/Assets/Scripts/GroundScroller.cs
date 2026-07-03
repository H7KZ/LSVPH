using UnityEngine;

// GroundScroller posouvá dvě dlaždice pozadí doleva a recykluje je.
// Přiřazen prázdnému GameObjectu "Ground", který je rodičem obou dlaždic.
//
// NASTAVENÍ VE SCÉNĚ:
//   1. Vytvoř prázdný GameObject "Ground" a přidej tento skript
//   2. Vytvoř 2 child GameObjecty: "BackgroundTile_A" a "BackgroundTile_B"
//   3. Každý dostane SpriteRenderer s Background.png — BEZ BoxCollider2D
//   4. BackgroundTile_A: X = 0, BackgroundTile_B: X = 14.56 (= šířka spritu)
//   5. Přiřaď oba objekty do pole "Ground Tiles" v Inspektoru
//   6. Sprite Import Settings: Pixels Per Unit = 100 (výchozí)
//
// Proč 2 dlaždice? Aby nebyla nikdy mezera — když první vyjede vlevo,
// teleportuje se za druhou a tvoří nekonečnou smyčku.
public class GroundScroller : MonoBehaviour
{
    // Výchozí šířka = 1456 px ÷ 100 PPU = 14.56 jednotek Unity
    [SerializeField] private Transform[] groundTiles;
    [SerializeField] private float tileWidth = 14.56f;
    [SerializeField] private float leftEdge = -13f;

    void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        float speed = GameManager.Instance.GameSpeed;

        foreach (Transform tile in groundTiles)
        {
            // Posuň dlaždici doleva
            tile.Translate(Vector3.left * speed * Time.deltaTime);

            // Když dlaždice vyjede mimo obrazovku vlevo, recykluj ji
            if (tile.position.x < leftEdge)
                RecycleTile(tile);
        }
    }

    private void RecycleTile(Transform tile)
    {
        // Najdi dlaždici nejdál vpravo a přidej šířku — tak dlaždice navazuje
        float rightmostX = GetRightmostX();
        Vector3 pos = tile.position;
        pos.x = rightmostX + tileWidth;
        tile.position = pos;
    }

    private float GetRightmostX()
    {
        float maxX = float.NegativeInfinity;
        foreach (Transform tile in groundTiles)
        {
            if (tile.position.x > maxX)
                maxX = tile.position.x;
        }
        return maxX;
    }
}
